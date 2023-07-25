from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

#Project model
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    picture = db.Column(db.Image)
    body = db.Column(db.String)
    likes = db.Column(db.Integer)
    knitter_id = db.Column(db.Integer, db.ForeignKey('knitters.id'))

#Knitter model
class Knitter(db.Model, SerializerMixin):
    __tablename__ = 'knitters'
  
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    picture = db.Column(db.Image)
    availability = db.Column(db.Bool)

    #Relationships
    knitter_event_dates = db.relationship('KnitterEventDate', backref = 'knitter')
    projects = db.relationship('Project', backref = "knitter")

    #Serialization rules
    serialize_rules = ('-knitter_event_dates.knitter', '-projects.knitter')
  
#KnitterEventDate model
class KnitterEventDate(db.Model, SerializerMixin):
    __tablename__ = 'knitter_event_dates'
  
    id = db.Column(db.Integer, primary_key=True)
    knitter_id = db.Column(db.Integer, db.ForeignKey('knitters.id'))
    event_date_id = db.Column(db.Integer, db.ForeignKey('event_dates.id'))

    #Serialization rules
    serialize_rules = ('-knitter.knitter_event_dates', '-event_date.knitter_event_dates')
  
#Event model
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
  
    id = db.Column(db.Integer, primary_key=True)
    picture = db.Column(db.Image)
    body = db.Column(db.String)

    #Relationships
    event_dates = db.relationship('EventDate', backref = 'event')

    #Serialization rules
    serialize_rules = ('-event_dates.event', )
  
#EventDate model
class EventDate(db.Model, SerializerMixin):
    __tablename__ = 'event_dates'
  
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    event_id = db.Column(db.Integer, db.ForeignKey('event_dates.id'))

    #Relationships
    knitter_event_dates = db.relationship('KnitterEventDate', backref = 'event_date')
    
    #Serialization rules
    serialize_rules = ('-knitter_event_dates.event_date', )