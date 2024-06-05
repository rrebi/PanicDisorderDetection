from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    jwt_auth_active = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, status):
        self.jwt_auth_active = status

    @classmethod
    def find_by_id(cls, user_id):
        return cls.query.get_or_404(user_id)

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    def to_dict(self):
        cls_dict = {'id': self.id, 'username': self.username}
        return cls_dict

    def to_json(self):
        return self.to_dict()

    def get_all_details(self):
        details = {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
        }
        return details


class PanicDisorderEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.Integer, nullable=False)
    family_history = db.Column(db.Integer, nullable=False)
    personal_history = db.Column(db.Integer, nullable=False)
    current_stressors = db.Column(db.Integer, nullable=False)
    symptoms = db.Column(db.Integer, nullable=False)
    severity = db.Column(db.Integer, nullable=False)
    impact_on_life = db.Column(db.Integer, nullable=False)
    demographics = db.Column(db.Integer, nullable=False)
    medical_history = db.Column(db.Integer, nullable=False)
    psychiatric_history = db.Column(db.Integer, nullable=False)
    substance_use = db.Column(db.Integer, nullable=False)
    coping_mechanisms = db.Column(db.Integer, nullable=False)
    social_support = db.Column(db.Integer, nullable=False)
    lifestyle_factors = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<PanicDisorderEntry {self.id}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, entry_id):
        return cls.query.get_or_404(entry_id)

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    def to_dict(self):
        cls_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'age': self.age,
            'gender': self.gender,
            'family_history': self.family_history,
            'personal_history': self.personal_history,
            'current_stressors': self.current_stressors,
            'symptoms': self.symptoms,
            'severity': self.severity,
            'impact_on_life': self.impact_on_life,
            'demographics': self.demographics,
            'medical_history': self.medical_history,
            'psychiatric_history': self.psychiatric_history,
            'substance_use': self.substance_use,
            'coping_mechanisms': self.coping_mechanisms,
            'social_support': self.social_support,
            'lifestyle_factors': self.lifestyle_factors,
        }
        return cls_dict

    def to_json(self):
        return self.to_dict()

class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jwt_token = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<JWTTokenBlocklist {self.jwt_token}>'

    def save(self):
        db.session.add(self)
        db.session.commit()
