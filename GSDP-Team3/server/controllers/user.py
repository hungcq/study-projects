from flask import Blueprint, request, jsonify

from models.user import User
from utils.auth import auth_required

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/users', methods=['GET'])
@auth_required
def get_users(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    users = User.query.all()
    response = [user.serialize for user in users]
    return jsonify(response), 200


@user_bp.route('/users', methods=['POST'])
@auth_required
def create_user(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    if user.user_class != 1:
        return jsonify({'message': 'No permission'}), 403
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user_class = request.json.get('user_class', None)

    if username and password and user_class:
        user = User(username, user_class)
        user.hash_password(password)
        user.save_to_db()
        response = user.serialize
        return jsonify(response), 201
    return jsonify({'message': 'Bad request'}), 400


@user_bp.route('/users/<int:id>', methods=['GET'])
@auth_required
def get_user(user, id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    user = User.find_by_id(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    response = user.serialize
    return jsonify(response), 200


@user_bp.route('/users/<int:id>', methods=['PUT', 'PATCH'])
@auth_required
def update_user(user, id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    if user.user_class != 1:
        return jsonify({'message': 'No permission'}), 403
    user = User.find_by_id(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    password = request.json.get('username', None)
    user_class = request.json.get('user_class', None)

    if user_class:
        user.user_class = user_class
    if password:
        user.hash_password(password)
    user.save_to_db()
    response = user.serialize
    return jsonify(response), 201


@user_bp.route('/users/<int:id>', methods=['DELETE'])
@auth_required
def delete_user(user, id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    if user.user_class != 1:
        return jsonify({'message': 'No permission'}), 403
    user = User.find_by_id(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.delete_from_db()
    return jsonify({'message': 'successfully delete'}), 201