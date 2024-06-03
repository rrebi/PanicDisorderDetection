import pickle
from datetime import datetime, timedelta, timezone
from functools import wraps
import pandas as pd

import jwt
from flask import request
from flask_restx import Api, fields, Resource

from api.config import Config
from api.models import User, JWTTokenBlocklist, db, PanicDisorderEntry

rest_api = Api(version='1.0', title='PanicHelp')

login_model = rest_api.model('LoginModel', {
    'username': fields.String(required=True, min_length=4, max_length=64),
    'password': fields.String(required=True, min_length=4, max_length=64)
})

register_model = rest_api.model('RegisterModel', {
    'username': fields.String(required=True, min_length=4, max_length=64),
    'password': fields.String(required=True, min_length=4, max_length=64),
    'first_name': fields.String(required=True, min_length=4, max_length=64)
})

update_user_model = rest_api.model('UpdateUserModel', {
    'username': fields.String(required=True, min_length=4, max_length=64),
    'first_name': fields.String(required=True, min_length=4, max_length=64)
})

post_panic_disorder_entry_model = rest_api.model('PostPanicDisorderEntryModel', {
    'user_id': fields.Integer(required=True),
    'age': fields.Integer(required=True),
    'gender': fields.Integer(required=True, description='1 for Female, 0 for Male'),
    'family_history': fields.Integer(required=True, description='1 for Yes, 0 for No'),
    'personal_history': fields.Integer(required=True, description='1 for Yes, 0 for No'),
    'current_stressors': fields.Integer(required=True, description='2 for Low, 1 for Moderate, 0 for High'),
    'symptoms': fields.Integer(required=True, description='1 for Panic attacks, 0 for No Panic attacks'),
    'severity': fields.Integer(required=True, description='2 for Severe, 1 for Moderate, 0 for Mild'),
    'impact_on_life': fields.Integer(required=True, description='0 for Mild, 1 for Moderate, 2 for Severe'),
    'demographics': fields.Integer(required=True, description='1 for Urban, 0 for Rural'),
    'medical_history': fields.Integer(required=True, description='0 for No, 1 for Yes'),
    'psychiatric_history': fields.Integer(required=True, description='2 for Depressive disorder, 1 for Other, 0 for None'),
    'substance_use': fields.Integer(required=True, description='1 for Drugs, 0 for No Drugs'),
    'coping_mechanisms': fields.Integer(required=True, description='0 for Socializing, 1 for Other'),
    'social_support': fields.Integer(required=True, description='2 for Low, 1 for Moderate, 0 for High'),
    'lifestyle_factors': fields.Integer(required=True, description='0 for Sleep quality, 1 for Exercise, 2 for Diet')
})

update_panic_disorder_entry_model = rest_api.model('UpdatePanicDisorderEntryModel', {
    'id': fields.Integer(required=True),
    'user_id': fields.Integer(required=False),
    'age': fields.Integer(required=False),
    'gender': fields.Integer(required=False, description='1 for Female, 0 for Male'),
    'family_history': fields.Integer(required=False, description='1 for Yes, 0 for No'),
    'personal_history': fields.Integer(required=False, description='1 for Yes, 0 for No'),
    'current_stressors': fields.Integer(required=False, description='2 for Low, 1 for Moderate, 0 for High'),
    'symptoms': fields.Integer(required=False, description='1 for Panic attacks, 0 for No Panic attacks'),
    'severity': fields.Integer(required=False, description='2 for Severe, 1 for Moderate, 0 for Mild'),
    'impact_on_life': fields.Integer(required=False, description='0 for Mild, 1 for Moderate, 2 for Severe'),
    'demographics': fields.Integer(required=False, description='1 for Urban, 0 for Rural'),
    'medical_history': fields.Integer(required=False, description='0 for No, 1 for Yes'),
    'psychiatric_history': fields.Integer(required=False, description='2 for Depressive disorder, 1 for Other, 0 for None'),
    'substance_use': fields.Integer(required=False, description='1 for Drugs, 0 for No Drugs'),
    'coping_mechanisms': fields.Integer(required=False, description='0 for Socializing, 1 for Other'),
    'social_support': fields.Integer(required=False, description='2 for Low, 1 for Moderate, 0 for High'),
    'lifestyle_factors': fields.Integer(required=False, description='0 for Sleep quality, 1 for Exercise, 2 for Diet')
})

def token_required(f):
    @wraps(f)
    def decorator(self, *args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(' ')[1]
            except IndexError:
                return {'success': False, 'msg': 'Token not found in the Authorization header'}, 400
        if not token:
            return {'success': False, 'msg': 'Valid JWT Token is missing'}, 400
        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            current_user = User.find_by_username(data['username'])
            print(f"Decoded User: {current_user}")  # Debugging line
            if not current_user:
                return {'success': False, 'msg': 'Invalid user'}, 400
            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()
            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400
            if not current_user.check_jwt_auth_active():
                return {'success': False, 'msg': 'JWT Token authentication is not active for this user'}, 400
        except Exception as e:
            print(f"Exception: {e}")  # Debugging line
            return {"success": False, "msg": "Invalid JWT Token"}, 400
        print(f"current_user type: {type(current_user)}")  # Debugging line
        return f(self, current_user, *args, **kwargs)
    return decorator


@rest_api.route('/api/users/register')
class Register(Resource):
    @rest_api.expect(register_model, validate=True)
    def post(self):
        request_data = request.get_json()
        _username = request_data.get('username')
        _password = request_data.get('password')
        _first_name = request_data.get('first_name')
        if User.find_by_username(_username):
            return {'success': False, 'msg': 'User with this username already exists'}, 400

        new_user = User(username=_username,
                        first_name=_first_name)
        new_user.set_password(_password)
        new_user.save()

        return {'success': True, 'msg': 'User created successfully'}, 201


@rest_api.route('/api/users/login')
class Login(Resource):
    @rest_api.expect(login_model, validate=True)
    def post(self):
        request_data = request.get_json()
        _username = request_data.get('username')
        _password = request_data.get('password')
        user_exists = User.find_by_username(_username)
        if not user_exists:
            return {'success': False, 'msg': 'User does not exist'}, 400
        if not user_exists.check_password(_password):
            return {'success': False, 'msg': 'Invalid password'}, 400

        token = jwt.encode({'username': _username, 'exp': datetime.utcnow() + Config.JWT_ACCESS_TOKEN_EXPIRES}, Config.SECRET_KEY,algorithm="HS256")
        user_exists.set_jwt_auth_active(True)
        user_exists.save()
        return {'success': True, 'user': user_exists.to_json(), 'token': token}, 200


@rest_api.route('/api/users/logout')
class Logout(Resource):
    @token_required
    def post(self, current_user):
        try:
            print(f"Logout current_user type: {type(current_user)}")  # Debugging line
            print(f"Logout current_user: {current_user.find_by_username}")  # Debugging line

            token = request.headers['Authorization'].split(' ')[1]
            print(f"Token logout:{token}")
            token_exists = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()
            print(f"Token exists logout:{token_exists}")

            if token_exists is not None:
                return {"success": False, "msg": "Token already revoked."}, 400

            token_blocklist = JWTTokenBlocklist(jwt_token=token, created_at=datetime.now(timezone.utc))
            token_blocklist.save()

            current_user.set_jwt_auth_active(False)
            current_user.save()

            return {'success': True, 'msg': 'User logged out successfully'}, 200
        except Exception as e:
            print(f"Logout Exception: {e}")  # Debugging line
            return {'success': False, 'msg': str(e)}, 500


@rest_api.route('/api/users/account')
class Users(Resource):
    @token_required
    def get(self, current_user):
        return {'success': True, 'user': current_user.get_all_details()}, 200

    @token_required
    @rest_api.expect(update_user_model, validate=True)
    def put(self, current_user):
        request_data = request.get_json()
        _username = request_data.get('username')
        _first_name = request_data.get('first_name')
        current_user.first_name = _first_name
        current_user.username = _username
        current_user.save()
        return {'success': True, 'msg': 'User updated successfully'}, 200

@rest_api.route('/api/users/account/password')
class UsersPassword(Resource):
    @token_required
    def put(self, current_user):
        request_data = request.get_json()
        _password = request_data.get('password')
        _new_password = request_data.get('new_password')
        if not current_user.check_password(_password):
            return {'success': False, 'msg': 'Wrong password'}, 400
        current_user.set_password(_new_password)
        current_user.save()
        return {'success': True, 'msg': 'Password updated successfully'}, 200


@rest_api.route('/api/disorders')
class PanicDisorder(Resource):
    @token_required
    def get(self, current_user):
        entries = PanicDisorderEntry.find_by_user_id(current_user.id)
        return {'success': True, 'disorders': [entry.to_json() for entry in entries]}, 200

    @token_required
    @rest_api.expect(post_panic_disorder_entry_model, validate=True)
    def post(self, current_user):
        try:
            request_data = request.get_json()
            print("Request Data:", request_data)  # Debugging line
            new_entry = PanicDisorderEntry(
                user_id=current_user.id,
                age=request_data.get('age'),
                gender=request_data.get('gender'),
                family_history=request_data.get('family_history'),
                personal_history=request_data.get('personal_history'),
                current_stressors=request_data.get('current_stressors'),
                symptoms=request_data.get('symptoms'),
                severity=request_data.get('severity'),
                impact_on_life=request_data.get('impact_on_life'),
                demographics=request_data.get('demographics'),
                medical_history=request_data.get('medical_history'),
                psychiatric_history=request_data.get('psychiatric_history'),
                substance_use=request_data.get('substance_use'),
                coping_mechanisms=request_data.get('coping_mechanisms'),
                social_support=request_data.get('social_support'),
                lifestyle_factors=request_data.get('lifestyle_factors')
            )
            new_entry.save()
            return {'success': True, 'msg': 'Panic disorder entry created successfully'}, 201
        except Exception as e:
            print("Error:", e)  # Debugging line

@rest_api.route('/api/disorder/<int:id>')
class PanicDisorderEntryRoute(Resource):
    @token_required
    def get(self, current_user, id):
        entry = PanicDisorderEntry.find_by_id(id)
        if not entry:
            return {'success': False, 'msg': 'Entry does not exist'}, 400
        if entry.user_id != current_user.id:
            return {'success': False, 'msg': 'Entry does not belong to this user'}, 400
        return {'success': True, 'entry': entry.to_json()}, 200

    @token_required
    @rest_api.expect(update_panic_disorder_entry_model, validate=True)
    def put(self, current_user, id):
        request_data = request.get_json()
        entry = PanicDisorderEntry.find_by_id(id)
        if not entry:
            return {'success': False, 'msg': 'Entry does not exist'}, 400

        if entry.user_id != current_user.id:
            return {'success': False, 'msg': 'Entry does not belong to this user'}, 400

        entry.user_id = request_data.get('user_id')
        entry.age = request_data.get('age')
        entry.gender = request_data.get('gender')
        entry.family_history = request_data.get('family_history')
        entry.personal_history = request_data.get('personal_history')
        entry.current_stressors = request_data.get('current_stressors')
        entry.symptoms = request_data.get('symptoms')
        entry.severity = request_data.get('severity')
        entry.impact_on_life = request_data.get('impact_on_life')
        entry.demographics = request_data.get('demographics')
        entry.medical_history = request_data.get('medical_history')
        entry.psychiatric_history = request_data.get('psychiatric_history')
        entry.substance_use = request_data.get('substance_use')
        entry.coping_mechanisms = request_data.get('coping_mechanisms')
        entry.social_support = request_data.get('social_support')
        entry.lifestyle_factors = request_data.get('lifestyle_factors')

        entry.save()
        return {'success': True, 'msg': 'Panic disorder entry updated successfully'}, 200

    @token_required
    def delete(self, current_user, id):
        print(id)
        entry = PanicDisorderEntry.find_by_id(id)
        if not entry:
            return {'success': False, 'msg': 'Entry does not exist'}, 400
        if entry.user_id != current_user.id:
            return {'success': False, 'msg': 'Entry does not belong to this user'}, 400

        entry.delete()
        return {'success': True, 'msg': 'Panic disorder entry deleted successfully'}, 200



# Load the models
try:
    with open('modelsAI/svm_model.pkl', 'rb') as svm_file:
        svm_model = pickle.load(svm_file)
    with open('modelsAI/dtc_model.pkl', 'rb') as tree_file:
        tree_model = pickle.load(tree_file)
    with open('modelsAI/model.pkl', 'rb') as xgboost_file:
        xgboost_model = pickle.load(xgboost_file)
except Exception as e:
    print(f"Error loading model: {e}")

@rest_api.route('/api/predict/<int:id>/<string:algorithm>')
class Predict(Resource):
    @token_required
    def get(self, current_user, id, algorithm):
        try:
            entry = PanicDisorderEntry.find_by_id(id)
            if not entry:
                return {'success': False, 'msg': 'Entry does not exist'}, 400
            if entry.user_id != current_user.id:
                return {'success': False, 'msg': 'Entry does not belong to this user'}, 400

            data = entry.to_json()
            df = pd.DataFrame([data])
            df.drop(columns=['id', 'user_id'], inplace=True)  # Drop non-feature columns

            print(f"Data for prediction: {df}")  # Debugging line

            prediction = None
            if algorithm == 'svm':
                prediction = svm_model.predict(df)
            elif algorithm == 'tree':
                prediction = tree_model.predict(df)
            elif algorithm == 'xgboost':
                prediction = xgboost_model.predict(df)
            else:
                return {'success': False, 'msg': 'Invalid algorithm specified'}, 400

            prediction_label = 'No Panic Disorder' if prediction[0] == 0 else 'Possible Panic Disorder'
            return {'success': True, 'prediction': prediction_label}, 200
        except Exception as e:
            print(f"Prediction Exception: {e}")  # Debugging line
            return {'success': False, 'msg': str(e)}, 500
