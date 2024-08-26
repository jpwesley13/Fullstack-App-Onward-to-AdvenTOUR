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
        
api.add_resource(Trainers, '/trainers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

