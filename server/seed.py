from app import app
from config import db
from faker import Faker
from models import Event, EventDate, Knitter, KnitterEventDate, Project
from ravelry import load_projects_and_knitters

fake = Faker()

if __name__ == "__main__":
    with app.app_context():
        # Clear data from tables
        Project.query.delete()
        Knitter.query.delete()
        KnitterEventDate.query.delete()
        Event.query.delete()
        EventDate.query.delete()

        # load from ravelry API
        projects, knitters = load_projects_and_knitters()

        # add passwords (for now all the same)
        for knitter in knitters:
            knitter.password_hash = "test1"

        # seed knitters and projects
        db.session.add_all(knitters)
        db.session.add_all(projects)
        db.session.commit()

        # Seed Events
        events = [
            Event(
                picture="ONE event image",
                bio="ONE event description",
            ),
            Event(
                picture="TWO event image",
                bio="TWO event description",
            ),
            Event(
                picture="THREE event image",
                bio="THREE event description",
            ),
        ]

        db.session.add_all(events)
        db.session.commit()

        # Seed EventDate
        eventdates = [
            EventDate(
                date="August 22, 2023",
            )
        ]

        db.session.add_all(eventdates)
        db.session.commit()
