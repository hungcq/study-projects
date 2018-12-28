# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify

from utils import jwttoken
from models.user import User

auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', '')
    password = request.json.get('password', None)

    user = User.find_by_username(username.lower())
    if user and user.verify_password(password):
        response = user.serialize
        response['access_token'] = jwttoken.encode(user).decode('utf-8')
        print(response['access_token'])
        return jsonify(response), 200
    else:
        return jsonify({"message": "Wrong credentials"}), 401


@auth_bp.route('/register', methods=['POST'])
def new_user():
    data = request.get_json()
    username = request.json.get('username', None)
    if username and User.find_by_username(username.lower()):
        return jsonify({"message": "Username exists in the system"}), 400
    user = User(username.lower(), 1)
    user.hash_password(data['password'])
    user.save_to_db()
    response = user.serialize
    response['access_token'] = jwttoken.encode(user).decode('utf-8')

    return jsonify(response), 201
