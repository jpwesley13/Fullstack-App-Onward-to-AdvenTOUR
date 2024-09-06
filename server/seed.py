#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Trainer, Habitat, Review, Region, Biome, Sighting

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Trainer.query.delete()
        Habitat.query.delete()
        Review.query.delete()
        Region.query.delete()
        Biome.query.delete()
        Sighting.query.delete()
        
        regions = []
        region_names = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea", "Orre", "Ultra Space", "Fiore", "Almia", "Oblivia", "Lental", "Uncharted"]

        for region_name in region_names:
            region = Region(
                name = region_name
            )
            regions.append(region)
        
        db.session.add_all(regions)

        biomes = []
        biome_names = ['forest', 'mountain', 'river', 'ocean', 'tundra', 'jungle', 'ruins', 'city', 'the unknown', 'cave', 'plains']

        for biome_name in biome_names:
            biome = Biome(
                name = biome_name
            )
            biomes.append(biome)

        db.session.add_all(biomes)

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

            trainer.biome = rc(biomes)

            trainers.append(trainer)

        db.session.add_all(trainers)

        habitats = []
        
        for i in range(30):
            habitat = Habitat(
                name = fake.city(),
            )

            habitat.region = rc(regions)

            habitats.append(habitat)

        db.session.add_all(habitats)

        reviews = []
        for i in range(50):

            review = Review(
                content = fake.paragraph(nb_sentences=8),
                danger = randint(1,5)
            )

            review.trainer = rc(trainers)
            review.habitat = rc(habitats)

            reviews.append(review)

        db.session.add_all(reviews)

        sightings = []
        for i in range(15):

            sighting = Sighting(
                name = fake.last_name(),
                blurb = fake.paragraph(nb_sentences=3)
            )

            sighting.trainer = rc(trainers)
            sighting.habitat = rc(habitats)

            sightings.append(sighting)

        db.session.add_all(sightings)

        db.session.commit()

