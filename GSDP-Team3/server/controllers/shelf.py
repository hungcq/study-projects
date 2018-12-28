from flask import Blueprint, request, jsonify

from utils.auth import auth_required
from models.shelf import Shelf

shelf_bp = Blueprint('shelf_bp', __name__)


@shelf_bp.route('/shelves', methods=['POST'])
@auth_required
def create_shelf(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    location_x = request.json.get('location_x', None)
    location_y = request.json.get('location_y', None)

    if location_x and location_y:
        shelf = Shelf(location_x, location_y)
        shelf.save_to_db()
        response = shelf.serialize

        return jsonify(response), 201


@shelf_bp.route('/shelves', methods=['GET'])
def get_shelves():
    shelves = Shelf.query.all()
    response = []
    for shelf in shelves:
        response.append(shelf.serialize)

    return jsonify({'shelves': response}), 200


@shelf_bp.route('/shelves/<int:shelf_id>', methods=['GET'])
def get_shelf(shelf_id):
    shelf = Shelf.find_by_id(shelf_id)
    if not shelf:
        return jsonify({'message': 'Shelf not found'}), 404

    response = shelf.serialize
    return jsonify({'shelf': response}), 200


@shelf_bp.route('/shelves/<int:shelf_id>', methods=['PUT', 'PATCH'])
@auth_required
def update_shelf(user, shelf_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    shelf = Shelf.find_by_id(shelf_id)
    if not shelf:
        return jsonify({'message': 'Shelf not found'}), 404

    location_x = request.json.get('location_x', shelf.location_x)
    location_y = request.json.get('location_y', shelf.location_y)

    if location_x:
        shelf.location_x = location_x
    if location_y:
        shelf.location_y = location_y
    shelf.save_to_db()
    response = shelf.serialize
    return jsonify(response), 200


@shelf_bp.route('/shelves/<int:shelf_id>', methods=['DELETE'])
@auth_required
def delete_user(user, shelf_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    shelf = Shelf.find_by_id(shelf_id)
    if not shelf:
        return jsonify({'message': 'Shelf not found'}), 404

    shelf.delete_from_db()
    return jsonify({'message': 'success'}), 200

