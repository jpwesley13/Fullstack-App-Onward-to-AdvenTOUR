#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Trainer, Habitat, Review, Region

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Trainer.query.delete()
        Habitat.query.delete()
        Review.query.delete()
        Region.query.delete()
        
        regions = []
        region_names = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea", "Orre", "Ultra Space", "Fiore", "Almia", "Oblivia", "Lental", "Uncharted"]

        for region_name in region_names:
            region = Region(
                name = region_name
            )
            regions.append(region)
        
        db.session.add_all(regions)    

        trainers = []
        names = []

        for i in range(10):

            name = fake.first_name()
            while name in names:
                name = fake.first_name()
            names.append(name)

            trainer = Trainer(
                name = name,
                age = randint(10,100)
            )

            trainer.password_hash = trainer.name + 'password'

            trainers.append(trainer)

        db.session.add_all(trainers)

        habitats = []
        
        for i in range(30):
            habitat = Habitat(
                name = fake.city(),
                danger = randint(1,5)
            )

            habitat.region = rc(regions)

            habitats.append(habitat)

        db.session.add_all(habitats)

        reviews = []
        for i in range(50):

            review = Review(
                content = fake.paragraph(nb_sentences=8)
            )

            review.trainer = rc(trainers)
            review.habitat = rc(habitats)

            reviews.append(review)

        db.session.add_all(reviews)

        db.session.commit()

