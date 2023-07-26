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
    pass


if __name__ == "__main__":
    app.run(port=5555, debug=True)
