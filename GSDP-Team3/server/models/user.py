from passlib.apps import custom_app_context as pwd_context

from db import db
from models.base import Base


class User(Base):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(250), nullable=False)
    user_class = db.Column(db.Integer, nullable=False)

    def __init__(self, username, user_class):
        self.username = username
        self.user_class = user_class

    @property
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'user_class': self.user_class
        }

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    @classmethod
    def find_by_id(cls, id):
        user = cls.query.filter_by(id=id).first()
        return user

    @classmethod
    def find_by_username(cls, username):
        user = cls.query.filter_by(username=username).first()
        return user


user_username_index = db.Index('user_username_index', User.username)
