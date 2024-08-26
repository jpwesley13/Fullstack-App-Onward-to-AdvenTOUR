#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from models import Habitat, Trainer, Review

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Onward to Adven-TOUR!</h1>'

class Trainers(Resource):
    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        return make_response(trainers, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_trainer = Trainer(
                name = params['name'],
                age = params['age']
            )
            db.session.add(new_trainer)
            db.session.commit()
            return make_response(new_trainer.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class TrainerById(Resource):
    def get(self, id):
        trainer = Trainer.query.filter(Trainer.id == id).first()
        if trainer:
            return make_response(trainer.to_dict(), 200)
        return make_response({'error': 'Trainer not found.'}, 404)
    
    def patch(self, id):
        trainer = Trainer.query.filter(Trainer.id == id).first()
        params = request.get_json()

        if trainer is None:
            return make_response({"error": "Trainer not found."}, 404)

        try:
            for attr in params:
                setattr(trainer, attr, params[attr])
            db.session.commit()
            return make_response(trainer.to_dict(), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class Habitats(Resource):
    def get(self):
        habitats = [habitat.to_dict() for habitat in Habitat.query.all()]
        return make_response(habitats, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_habitat = Habitat(
                name = params['name'],
                danger = params['danger']
            )
            db.session.add(new_habitat)
            db.session.commit()
            return make_response(new_habitat.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class HabitatById(Resource):
    def get(self, id):
        habitat = Habitat.query.filter(Habitat.id == id).first()
        if habitat:
            return make_response(habitat.to_dict(), 200)
        return make_response({'error': 'Habitat not found.'}, 404)
        
api.add_resource(Trainers, '/trainers')
api.add_resource(TrainerById, '/trainers/<int:id>')
api.add_resource(Habitats, '/habitats')
api.add_resource(HabitatById, '/habitats/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

