#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from models import Habitat, Trainer, Review, Region, Sighting, Biome

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
     return '<h1>Test Server</h1>'

class Regions(Resource):
    def get(self):
        regions = [region.to_dict() for region in Region.query.all()]
        return make_response(regions, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_region = Region(
                name = params['name'],
            )
            db.session.add(new_region)
            db.session.commit()
            return make_response(new_region.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class RegionById(Resource):
    def get(self, id):
        region = Region.query.filter(Region.id == id).first()
        if region:
            return make_response(region.to_dict(), 200)
        return make_response({'error': 'Region not found.'}, 404)
    
class Biomes(Resource):
    def get(self):
        biomes = [biome.to_dict() for biome in Biome.query.all()]
        return make_response(biomes, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_biome = Biome(
                name = params['name'],
            )
            db.session.add(new_biome)
            db.session.commit()
            return make_response(new_biome.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class BiomeById(Resource):
    def get(self, id):
        biome = Biome.query.filter(Biome.id == id).first()
        if biome:
            return make_response(biome.to_dict(), 200)
        return make_response({'error': 'Biome not found.'}, 404)

class Habitats(Resource):
    def get(self):
        habitats = [habitat.to_dict() for habitat in Habitat.query.all()]
        return make_response(habitats, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_habitat = Habitat(
                name = params['name'],
                image = params['image']
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

class Trainers(Resource):
    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        return make_response(trainers, 200)
        
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
        
class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_review = Review(
                content = params['content'],
                danger = params['danger'],
                trainer_id = params['trainer_id'],
                habitat_id = params['habitat_id']
            )

            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
    
class ReviewById(Resource):
    def get(self, id):
        review = Review.query.filter(Review.id == id).first()
        if review:
            return make_response(review.to_dict(), 200)
        return make_response({'error': 'Review not found.'}, 404)
    
class Sightings(Resource):
    def get(self):
        sightings = [sighting.to_dict() for sighting in Sighting.query.all()]
        return make_response(sightings, 200)
    
    def post(self):
        params = request.get_json()

        try:
            new_sighting = Sighting(
                name = params['name'],
                image = params['image'],
                blurb = params['blurb'],
                trainer_id = params['trainer_id'],
                habitat_id = params['habitat_id']
            )

            db.session.add(new_sighting)
            db.session.commit()
            return make_response(new_sighting.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
    
class SightingById(Resource):
    def get(self, id):
        sighting = Sighting.query.filter(Sighting.id == id).first()
        if sighting:
            return make_response(sighting.to_dict(), 200)
        return make_response({'error': 'Rare sighting not found.'}, 404)
    
class Signup(Resource):
    def post(self):
        params = request.get_json()
        password = params.get('password')
        biome_name = params.get('biome')

        try:
            new_trainer = Trainer(
                name = params['name'],
                image = params['image'],
                age = params['age'],
            )
            new_trainer.password_hash = password

            biome = Biome.query.filter(Biome.name == biome_name).first()
            new_trainer.biome = biome

            print(f"New trainer: {new_trainer}")

            db.session.add(new_trainer)
            db.session.commit()
            session['user_id'] = new_trainer.id

            print("Trainer added successfully")

            return make_response(new_trainer.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
        
class CheckSession(Resource):
    def get(self):
        trainer_id = session['user_id']
        if trainer_id:
            trainer = Trainer.query.filter(Trainer.id == trainer_id).first()
            return trainer.to_dict(), 200
        return {}, 401
        
class Login(Resource):
    def post(self):
        params = request.get_json()

        name = params['name']
        password = params['password']

        trainer = Trainer.query.filter(Trainer.name == name).first()

        if trainer:
            if trainer.authenticate(password):
                session['user_id'] = trainer.id
                return trainer.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Trainers, '/trainers')
api.add_resource(TrainerById, '/trainers/<int:id>')
api.add_resource(Habitats, '/habitats')
api.add_resource(HabitatById, '/habitats/<int:id>')
api.add_resource(Regions, '/regions')
api.add_resource(RegionById, '/regions/<int:id>')
api.add_resource(Biomes, '/biomes')
api.add_resource(BiomeById, '/biomes/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewById, '/reviews/<int:id>')
api.add_resource(Sightings, '/sightings')
api.add_resource(SightingById, '/sightings/<int:id>')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

app.secret_key = '48D7090A3C0D9FB9'

if __name__ == '__main__':
    app.run(port=5555, debug=True)

