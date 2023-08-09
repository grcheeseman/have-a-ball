import random

import requests
from models import Knitter, Project
from my_secrets import RAVELRY_API_PASSWORD, RAVELRY_API_USERNAME
from requests.auth import HTTPBasicAuth

API_URL = "https://api.ravelry.com"
AUTH = HTTPBasicAuth(RAVELRY_API_USERNAME, RAVELRY_API_PASSWORD)

# Bios are not available through the read-only API so just
# randomly pick one of these
BIOS = [
    "I started knitting when I was five while watching my Swedish mother knititng. Since then it has been a costant hobby …and in the last years almost the meaning of life itself- The creativity and the texture of the yarns involved are pure joy. I am trying to teach my daughetrs my passion, but each one of us has its talents.",
    "20 something years ago my sweet little old grandma tried to teach me how to knit, but my lil child brain had only cartoons on its mind.I finally picked it up in 2014 and have not put it down since. I only entertained the idea of knitting a sweater in 2019, and finished my first one in 2020! Recently I have fallen in love with rustic yarn and I can hear my wallet crying already.",
    "I grew up watching Mom knit but never learned. Instead, I learned due to a Living Social knitting class coupon that my friend & I decided to try. I ended up learning to knit on March 18, 2012- what wouldve been my grandparents 75th wedding anniversary. Grandma was a wiz at knitting, sewing, & cooking, so I treasure that I learned on their special day. Turns out that my Dads mom used to own a yarn shop! I used some of her old yarn to knit baby clothes for my daughter. Ive loved learning to knit in the Adirondacks. Also, my love of knitting helped keep me busy when we moved to California (& Virginia & Tennesse), & I didnt know anyone. My love of knitting helped rekindle my moms love too. Weve had so much fun knitting together.",
    "I enjoy creating gifts for family, friends and figure out how to make them. Not always as good as I saw but turned out to be loved when presented",
    "Since I joined Ive really grown as a knitter. Ive done things I never dreamed possible. It is truly because of all of you that Ive grown so much. Seeing all of the finished projects is so helpful. Its been extremely helpful when there are pictures of each of the stages on particularly challenging knits. I havent got to socks yet, but I have knit stockings and recently knit up two wine cozies which requires dpns so my fear of them is slowly disappearing. My next plan is to knit mitts and then try socks again, this time on dpns Ive tried the two circular method and I keep getting laddering and for some reason I dont when I use dpns or even magic loop but I think dpns might be the best method for me.",
]

BODY = [
    "One of my Ravelry friends began one of these a couple of months ago, and it looked like such a lovely project. Im hoping that I can use up lots of scraps of sock yarn whilst knitting mine, as I have accumulated so many in the last year or so!", 
    "Using laceweight and heavy laceweight scraps on varying colours and yarn types. Started with merino and cashmere working down to merino and alpaca. Hopefully resulting sweater will be as warm and comfortable as my green and purple experiment. First sleeve used most of the blue so have to improvise sleeve 2. Decrease sleeves to 57 stitches"
    "This went much faster this time around. I kept three circular needles on at all times, knitting the sleeves row by row with the body so I knew which yarns to use. I am very happy with this overall. Sleeves are a little tight. I should have increased needle size as the pattern recommended",
    
    ]


def load_projects_and_knitters():
    """
    Load projects and associated users from Ravelry API
    to seed database
    """

    params = {
        "page_size": 25,
        # "sort": "best",
    }

    response = requests.get(API_URL + "/projects/search.json", params=params, auth=AUTH)

    knitters = {}
    projects = []

    for p in response.json()["projects"]:
        # so we don't duplicate knitters, use the ravelry
        # user id to keep track of which knitters already exist
        ravelry_user_id = p["user_id"]
        if ravelry_user_id not in knitters:
            # create knitter
            user = p["user"]
            knitter = Knitter(
                username=user["username"],
                picture=user["photo_url"],
                bio=random.choice(BIOS),
            )
            knitters[ravelry_user_id] = knitter

        # to mix things up so some knitters will have multiple
        # projects and some will have none, assign the project
        # to a random knitter
        knitter = random.choice(list(knitters.values()))

        # create project
        project = Project(
            picture=p["first_photo"]["medium2_url"],
            body=random.choice(BODY),
            likes=p["favorites_count"],
            knitter=knitter,
            pattern_name=p["name"],
        )
        projects.append(project)

    # knitters is a dict, but we no longer care about the keys,
    # they were just for not duplicating knitters
    return (projects, list(knitters.values()))
