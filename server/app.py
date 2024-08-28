#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, redirect, session
from flask_restful import Resource
from models import Habitat, Trainer, Review

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

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
    
class Signup(Resource):
    def post(self):
        params = request.get_json()
        password = params.get('password')

        try:
            new_trainer = Trainer(
                name = params['name'],
                age = params['age'],
            )
            new_trainer.password_hash = password

            db.session.add(new_trainer)
            db.session.commit()
            session['user_id'] = new_trainer.id
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
api.add_resource(Habitats, '/')
api.add_resource(HabitatById, '/habitats/<int:id>')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewById, '/reviews/<int:id>')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

@app.route('/habitats')
def redirect_home():
    return redirect('/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

