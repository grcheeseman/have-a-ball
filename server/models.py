from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt

db = SQLAlchemy()

#Project model
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id =  db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.String)
    body = db.Column(db.String)
    likes = db.Column(db.Integer)

    knitter_id = db.Column(db.Integer, db.ForeignKey('knitters.id'))

    serialize_rules = ('-knitter.projects',)

#Knitter model
class Knitter(db.Model, SerializerMixin):
    __tablename__ = 'knitters'
  
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    picture = db.Column(db.String)
    bio = db.Column(db.String) 
    #availability = db.Column(db.String)

    #Relationships
    knitter_event_dates = db.relationship('KnitterEventDate', backref = 'knitter')
    projects = db.relationship('Project', backref = "knitter")

    #Serialization rules
    serialize_rules = ('-knitter_event_dates.knitter', '-projects.knitter', '-_password_hash', )

    #Authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
        
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'
  
#KnitterEventDate model
class KnitterEventDate(db.Model, SerializerMixin):
    __tablename__ = 'knitter_event_dates'
  
    id = db.Column(db.Integer, primary_key=True)

    knitter_id = db.Column(db.Integer, db.ForeignKey('knitters.id'))
    event_date_id = db.Column(db.Integer, db.ForeignKey('event_dates.id'))

    #Serialization rules
    serialize_rules = ('-knitter.knitter_event_dates', '-event_date.knitter_event_dates',)
  
#Event model
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
  
    id = db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.String)
    bio = db.Column(db.String)

    #Relationships
    event_dates = db.relationship('EventDate', backref = 'event')

    #Serialization rules
    serialize_rules = ('-event_dates.event', )
  
#EventDate model
class EventDate(db.Model, SerializerMixin):
    __tablename__ = 'event_dates'
  
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    #Relationships
    knitter_event_dates = db.relationship('KnitterEventDate', backref = 'event_date')
    
    #Serialization rules
    serialize_rules = ('-knitter_event_dates.event_date', '-event.event_dates', )