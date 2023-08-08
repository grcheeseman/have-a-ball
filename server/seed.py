from app import app
from config import db
from faker import Faker
from models import Event, EventDate, Knitter, KnitterEventDate, Project
from ravelry import load_projects_and_knitters

import random
from datetime import date, timedelta

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
                picture="https://knitwithattitude.com/media/wysiwyg/surgery-workshop-kwa.jpg",
                name="Fiber Arts Workshop",
                bio="Do you knit, crochet, quilt, cross stitch or embroider? Join us for a crafting circle to work on your latest project while drinking wine! Invite all your crafty friends.",
            ),
            Event(
                picture="https://www.jimmybeanswool.com/secure-html/productImages/10094Large_5289.jpg",
                name="Crafty Crafty Hippo",
                bio="Everyone who comes out will be able to help create an interactive knit piece, a kind of wearable guest book.",
            ),
            Event(
                picture="https://s3fs.paintnite.com/fresca-web-html/paintnite/public-events-experiences/assets/images/chunky-knit.png",
                name="Sip and Knit",
                bio="One free drink, knitting supplies, and a lesson on how to knit included!",
            ),
        ]

        db.session.add_all(events)
        db.session.commit()

        eventdates = []
        for i in range(10):
            # pick a random date within a year of today
            random_date = date.today() + timedelta(days=random.randint(-365, 365))
            eventdates.append(EventDate(date=random_date, event=random.choice(events)))

        db.session.add_all(eventdates)
        db.session.commit()
