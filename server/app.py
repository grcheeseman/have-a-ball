from http import HTTPStatus

from config import api, app, db
from flask import Flask, abort, jsonify, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Resource
from models import Event, EventDate, Knitter, KnitterEventDate, Project
from sqlalchemy.exc import IntegrityError


class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get("username")
        password = request_json["password"]
        image_url = request_json["image_url"]
        bio = request_json["bio"]

        new_knitter = Knitter(username=username, image_url=image_url, bio=bio)
        new_knitter.password_hash = password

        try:
            db.session.add(new_knitter)
            db.session.commit()
            session["knitter_id"] = new_knitter.id

            return new_knitter.to_dict(), 201

        except IntegrityError:
            db.session.rollback()
            return {"error": "Username already exists"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")


class CheckSession(Resource):
    def get(self):
        if session.get("knitter_id"):
            knit_user = Knitter.query.filter(
                Knitter.id == session["knitter_id"]
            ).first()
            return knit_user.to_dict(), 200

        return {"error": "401 Unauthorized"}, HTTPStatus.UNAUTHORIZED


api.add_resource(CheckSession, "/check_session", endpoint="check_session")


class Login(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json["username"]
        knit_user = Knitter.query.filter(Knitter.username == username).first()
        password = request_json["password"]

        if knit_user and knit_user.authenticate(password):
            session["knitter_id"] = knit_user.id
            response = make_response(jsonify(knit_user.to_dict()), HTTPStatus.OK)
        else:
            response = make_response({}, HTTPStatus.UNAUTHORIZED)

        return response


api.add_resource(Login, "/login", endpoint="login")


class Logout(Resource):
    def delete(self):
        session.clear()
        return {}, HTTPStatus.NO_CONTENT


api.add_resource(Logout, "/logout", endpoint="logout")


class KnitterById(Resource):
    def get(self, id):
        knitter_by_id = Knitter.query.filter(Knitter.id == id).first()

        response = make_response(knitter_by_id.to_dict(), HTTPStatus.OK)

        return response


api.add_resource(KnitterById, "/knitters/<int:id>")


class KnitterByAll(Resource):
    def get(self):
        knitter_list = [knitter.to_dict() for knitter in Knitter.query.all()]

        response = make_response(knitter_list, 200)

        return response


api.add_resource(KnitterByAll, "/knitters")


class KnitterAddToEvent(Resource):
    def post(self, knitter_id, event_date_id):
        # user can only add event date for themself
        if session.get("knitter_id") != knitter_id:
            return {"error": "401 Unauthorized"}, HTTPStatus.UNAUTHORIZED

        try:
            # create new many-to-many relationship
            knitter_event_date = KnitterEventDate(
                knitter_id=knitter_id, event_date_id=event_date_id
            )
            db.session.add(knitter_event_date)
            db.session.commit()
            return {"success": "event date added to knitter"}, HTTPStatus.OK
        except IntegrityError:
            # unique key constraint failed, but this is ok it just means the knitter is already attending the event
            return {"success": "already attending"}, HTTPStatus.OK


api.add_resource(
    KnitterAddToEvent, "/knitters/<int:knitter_id>/add_event_date/<int:event_date_id>"
)


class EventsByAll(Resource):
    def get(self):
        event_list = [
            event.to_dict(
                rules=(
                    "-event_dates.event_id",
                    "-event_dates.knitter_event_dates",
                )
            )
            for event in Event.query.all()
        ]

        response = make_response(event_list, 200)

        return response


api.add_resource(EventsByAll, "/events")


class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter(Event.id == id).first()
        if event is None:
            return {"error": "No event exists with id"}, HTTPStatus.NOT_FOUND

        # if user is logged in, set attending field on event dates
        if "knitter_id" in session:
            for event_date in event.event_dates:
                # check each many-to-many relationship and set attending if we see logged in knitter's id
                for knitter_event_date in event_date.knitter_event_dates:
                    if knitter_event_date.knitter_id == session["knitter_id"]:
                        event_date.attending = True
                        # don't need to keep checking, we already found it
                        break

        return make_response(
            event.to_dict(
                rules=(
                    "event_dates.attending",
                    "-event_dates.event_id",
                    "-event_dates.knitter_event_dates",
                )
            ),
            HTTPStatus.OK,
        )


api.add_resource(EventsById, "/events/<int:id>")


class ProjectsById(Resource):
    def get(self, id):
        project = Project.query.filter(Project.id == id).first()
        if project is None:
            return {"error": "No project exists with id"}, HTTPStatus.NOT_FOUND

        return make_response(project.to_dict(), HTTPStatus.OK)

    def delete(self, id):
        project = Project.query.filter(Project.id == id).first()
        if project is None:
            return {"error": "No project exists with id"}, HTTPStatus.NOT_FOUND

        if session.get("knitter_id") == project.knitter_id:
            db.session.delete(project)
            db.session.commit()
            return {"Success": "Your project post has been deleted."}, HTTPStatus.OK

        return {"error": "401 Unauthorized"}, HTTPStatus.UNAUTHORIZED

    def patch(self, id):
        project_item = Project.query.filter(Project.id == id).first()

        if not project_item:
            abort(404, "The project could not be found")

        request_json = request.get_json()

        for key in request_json:
            setattr(project_item, key, request_json[key])

        db.session.add(project_item)

        db.session.commit()

        response = make_response(project_item.to_dict(), 200)

        return response


api.add_resource(ProjectsById, "/projects/<int:id>")


class ProjectsByAll(Resource):
    def get(self):
        knitter_id = request.args.get("knitter_id", type=int)
        if knitter_id is not None:
            projects = Project.query.where(Project.knitter_id == knitter_id)
        else:
            projects = Project.query.all()

        project_list = [
            project.to_dict(rules=("-knitter.knitter_event_dates",))
            for project in projects
        ]

        response = make_response(project_list, 200)

        return response

    def post(self):
        knitter_id = session.get("knitter_id")
        if knitter_id is None:
            return {"error": "401 Unauthorized"}, HTTPStatus.UNAUTHORIZED

        request_json = request.get_json()

        new_project = Project(
            pattern_name=request_json["pattern_name"],
            picture=request_json["picture"],
            body=request_json["body"],
            likes=0,
            knitter_id=knitter_id,
        )

        db.session.add(new_project)
        db.session.commit()

        response = make_response(
            new_project.to_dict(rules=("-knitter",)), HTTPStatus.CREATED
        )

        return response


api.add_resource(ProjectsByAll, "/projects")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
