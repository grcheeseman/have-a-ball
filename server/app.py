from flask import Flask, jsonify, make_response, request, abort
from flask_migrate import Migrate
from models import db
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db) 

db.init_app(app)

api= Api(app)

CORS(app)

@app.route('/') 
def index(): 
    return '<h1>Hello backend World</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)