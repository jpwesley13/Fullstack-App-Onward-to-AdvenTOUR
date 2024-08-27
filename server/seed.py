#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Trainer, Habitat, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Trainer.query.delete()
        Habitat.query.delete()

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

            habitats.append(habitat)

        db.session.add_all(habitats)

        db.session.commit()

