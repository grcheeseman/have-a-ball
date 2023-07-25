from app import app
from models import db, Project, Knitter, KnitterEventDate, Event, EventDate
from faker import Faker

fake = Faker()

if __name__ == '__main__':

    with app.app_context():

        #Clear data from tables
        Project.query.delete()
        Knitter.query.delete()
        KnitterEventDate.query.delete()
        Event.query.delete()
        EventDate.query.delete()

        #Seed projects
        projects = [
            Project (
                picture = "https://images4-g.ravelrycache.com/uploads/RavioliKnits/828599536/4825FFE4-817B-4D0C-A3C9-AABCFBB7EE74_small2.jpeg",
                body = "Mirror Pond Beanie knit with Malabrigo Rasta Yarn in Anniversario and Natural",
                likes = 128
            ),
            Project (
                picture = "https://images4-g.ravelrycache.com/uploads/RavioliKnits/931290472/IMG_5902_small2.jpeg",
                body = "Tank top",
                likes = 97
            ),
            Project (
                picture = "https://images4-f.ravelrycache.com/uploads/RavioliKnits/895392470/137344E9-2609-4F2F-B152-BB33F19CD0B1_small2.jpeg",
                body = "Holiday socks!",
                likes = 84            
            )
        ]

        db.session.add_all(projects)
        db.session.commit()

        #Seed Knitters
        knitters = []
        usernames = []

        for i in range(3):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = Knitter (
                username = username,
                picture = fake.url(),
                bio = fake.paragraph(nb_sentences=4),
            )

            user.password_hash = user.username + 'password'

            knitters.append(user)

        db.session.add_all(knitters)
        db.session.commit()

        #Seed Events
        events = [
            Event (
                picture = "ONE event image",
                bio = "ONE event description",
            ),
            Event (
                picture = "TWO event image",
                bio = "TWO event description",
            ),
            Event (
                picture = "THREE event image",
                bio = "THREE event description",
            )
        ]

        db.session.add_all(events)
        db.session.commit()

        #Seed EventDate
        eventdates = [
            EventDate (
                date = "August 22, 2023",
                )]
            
        

        db.session.add_all(eventdates)
        db.session.commit()
