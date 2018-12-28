from flask import Blueprint, request, jsonify

from models.packet import Packet
from utils.auth import auth_required

packet_bp = Blueprint('packet_bp', __name__)


@packet_bp.route('/packets', methods=['POST'])
@auth_required
def create_package(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    barcode = request.json.get('barcode', None)
    length = request.json.get('length', None)
    width = request.json.get('width', None)
    height = request.json.get('height', None)
    shelf_id = request.json.get('shelf_id', None)
    light_param = request.json.get('light_param', None)
    temp_param = request.json.get('temp_param', None)

    if barcode and length and width and height and light_param and temp_param:
        packet = Packet(barcode, length, width, height, shelf_id, light_param, temp_param)
        packet.save_to_db()
        response = packet.serialize
        return jsonify(response), 201


@packet_bp.route('/packets', methods=['GET'])
def get_packets():
    packets = Packet.query.all()
    response = []
    for packet in packets:
        response.append(packet.serialize)

    return jsonify({'packets': response}), 200


@packet_bp.route('/packets/<int:packet_id>', methods=['GET'])
def get_packet(packet_id):
    packet = Packet.find_by_id(packet_id)
    if not packet:
        return jsonify({'message': 'Packet not found'}), 404

    response = packet.serialize
    return jsonify({'packet': response}), 200


@packet_bp.route('/packets/<int:packet_id>', methods=['PUT', 'PATCH'])
@auth_required
def update_package(user, packet_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    packet = Packet.find_by_id(packet_id)
    if not packet:
        return jsonify({'message': 'Packet not found'}), 404

    barcode = request.json.get('barcode', packet.barcode)
    length = request.json.get('length', packet.length)
    width = request.json.get('width', packet.width)
    height = request.json.get('height', packet.height)
    light_param = request.json.get('light_param', packet.light_param)
    temp_param = request.json.get('temp_param', packet.temp_param)

    # unnecessary if
    if barcode:
        packet.barcode = barcode
    if length:
        packet.length = length
    if width:
        packet.width = width
    if height:
        packet.height = height
    if light_param:
        packet.light_param = light_param
    if temp_param:
        packet.temp_param = temp_param

    packet.save_to_db()
    response = packet.serialize
    return jsonify(response), 200


@packet_bp.route('/packets/<int:packet_id>', methods=['DELETE'])
@auth_required
def delete_packet(user, packet_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    packet = Packet.find_by_id(packet_id)
    if not packet:
        return jsonify({'message': 'Packet not found'}), 404
    packet.delete_from_db()
    return jsonify({'message': 'success'}), 200
