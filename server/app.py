from http import HTTPStatus

from config import api, app, db
from flask import Flask, abort, jsonify, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Resource
from models import Event, EventDate, Knitter, KnitterEventDate, Project
from sqlalchemy.exc import IntegrityError


# CHECK COMPLETE
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


# CHECK COMPLETE
class CheckSession(Resource):
    def get(self):
        if session.get("knitter_id"):
            knit_user = Knitter.query.filter(
                Knitter.id == session["knitter_id"]
            ).first()
            return knit_user.to_dict(), 200

        return {"error": "401 Unauthorized"}, HTTPStatus.UNAUTHORIZED


api.add_resource(CheckSession, "/check_session", endpoint="check_session")


# CHECK COMPLETE
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


# CHECK COMPLETE
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


class EventsByAll(Resource):
    def get(self):
        event_list = [event.to_dict() for event in Event.query.all()]

        response = make_response(event_list, 200)

        return response


api.add_resource(EventsByAll, "/events")


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
        project_list = [project.to_dict() for project in Project.query.all()]

        response = make_response(project_list, 200)

        return response

    def post(self):
        # try:
        request_json = request.get_json()

        new_project = Project(
            picture=request_json["picture"],
            body=request_json["body"],
            likes=request_json["likes"],
            pattern_name=request_json["pattern_name,"]
        )

        db.session.add(new_project)
        db.session.commit()

        response = make_response(jsonify(new_project.to_dict()), 201)

        return response

        # except ValueError:
        #     response = make_response("error occured", 400)
        #     return response


api.add_resource(ProjectsByAll, "/projects")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
