from flask import Flask, abort, jsonify, make_response, request, session
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import api, app, db
from models import Event, EventDate, Knitter, KnitterEventDate, Project


@app.route("/")
def index():
    return "<h1>Hello backend World</h1>"


class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")
        image_url = request_json.get("image_url")
        bio = request_json.get("bio")

        user = Knitter(username=username, image_url=image_url, bio=bio)

        user.password_hash = password

        print("first")

        try:
            print("here!")

            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:
            print("no, here!")

            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")


class AutoLogIn(Resource):
    def get(self):
        if session.get("user_id"):
            user = Knitter.query.filter(Knitter.id == session["user_id"]).first()

            return user.to_dict(), 200

        return {"error": "401 Unauthorized"}, 401


api.add_resource(AutoLogIn, "/auto_log_in", endpoint="auto_log_in")


class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get("username")
        password = request_json.get("password")

        user = Knitter.query.filter(Knitter.username == username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200

        return {"error": "401 Unauthorized"}, 401


api.add_resource(Login, "/login", endpoint="login")


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None

            return {}, 204

        return {"error": "401 Unauthorized"}, 401


api.add_resource(Logout, "/logout", endpoint="logout")


class KnitterById(Resource):
    def get(self, id):
        knitter_by_id = Knitter.query.filter(Knitter.id == id).first()

        response = make_response(knitter_by_id.to_dict(),200)

        return response
    
api.add_resource(KnitterById, '/knitters/<int:id>')
    

class KnitterByAll(Resource):
    def get(self):
        knitter_list = [knitter.to_dict() for knitter in Knitter.query.all()]

        response = make_response(knitter_list, 200)

        return response

api.add_resource(KnitterByAll, '/knitters')


class EventsByAll(Resource):
    def get(self):
        event_list = [event.to_dict() for event in Event.query.all()]

        response = make_response(event_list, 200)

        return response

api.add_resource(EventsByAll, '/events')


class ProjectsById(Resource):
    def get(self, id):
        project_by_id = Project.query.filter(Project.id == id).first()

        response = make_response(project_by_id.to_dict(),200)

        return response
    
    def delete(self, id):
        single_project = Project.query.filter(Project.id == id).first()

        db.session.delete(single_project)
        db.session.commit()

        response = make_response({"Success": "Your project post has been deleted."}, 200)

        return response
    
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
    
api.add_resource(ProjectsById, '/projects/<int:id>')


class ProjectsByAll(Resource):
    def get(self):
        project_list = [project.to_dict() for project in Project.query.all()]

        response = make_response(project_list, 200)

        return response
    
    def post(self):
        # try:
        request_json = request.get_json()

        new_project = Project(
            picture = request_json['picture'],
            body = request_json['body'],
            likes = request_json['likes']
        )
    
        db.session.add(new_project)
        db.session.commit()

        response = make_response(jsonify(new_project.to_dict()), 201)

        return response
    
        # except ValueError:
        #     response = make_response("error occured", 400)
        #     return response
        
api.add_resource(ProjectsByAll, '/projects')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
