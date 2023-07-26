import random

import requests
from requests.auth import HTTPBasicAuth

from models import Knitter, Project
from my_secrets import RAVELRY_API_PASSWORD, RAVELRY_API_USERNAME

API_URL = "https://api.ravelry.com"
AUTH = HTTPBasicAuth(RAVELRY_API_USERNAME, RAVELRY_API_PASSWORD)

# Bios are not available through the read-only API so just
# randomly pick one of these
BIOS = [
    "I like to knit",
    "Knitting is cool",
    "Look at my neat sweater",
]


def load_projects_and_knitters():
    """
    Load projects and associated users from Ravelry API
    to seed database
    """

    params = {
        "page_size": 25,
        "sort": "best",
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
                picture=user["small_photo_url"],
                bio=random.choice(BIOS),
            )
            knitters[ravelry_user_id] = knitter

        # to mix things up so some knitters will have multiple
        # projects and some will have none, assign the project
        # to a random knitter
        knitter = random.choice(list(knitters.values()))

        # create project
        project = Project(
            picture=p["first_photo"]["small_url"],
            body=p["name"],
            likes=p["favorites_count"],
            knitter=knitter,
        )
        projects.append(project)

    # knitters is a dict, but we no longer care about the keys,
    # they were just for not duplicating knitters
    return (projects, list(knitters.values()))
