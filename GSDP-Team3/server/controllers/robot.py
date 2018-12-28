from flask import Blueprint, request, jsonify

from utils.auth import auth_required
from models.robot import Robot

robot_bp = Blueprint('robot_bp', __name__)


@robot_bp.route('/robots', methods=['POST'])
@auth_required
def create_robot(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    current_location_x = request.json.get('current_location_x', 0)
    current_location_y = request.json.get('current_location_y', 0)
    mac_address = request.json.get('mac_address')

    robot = Robot(current_location_x, current_location_y, mac_address)
    robot.save_to_db()
    response = robot.serialize

    return jsonify(response), 201


@robot_bp.route('/robots/override', methods=['POST'])
@auth_required
def override_robot(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    robot_id = request.json.get('robot_id', None)
    robot = Robot.find_by_id(robot_id)
    if not robot:
        return jsonify({'message': 'Robot not found'}), 400
    # Send manual command to robot
    robot.sendManual('manual')

    return jsonify({}), 201


@robot_bp.route('/robots/manual', methods=['POST'])
@auth_required
def send_manual_robot(user):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    robot_id = request.json.get('robot_id', None)
    command = request.json.get('command', None)
    robot = Robot.find_by_id(robot_id)
    if not robot:
        return jsonify({'message': 'Robot not found'}), 400
    if not command:
        return jsonify({'message': 'No command found'}), 400
    if command not in ['auto', 'manual', 'forward', 'backward', 'right', 'left', 'exit', 'stop']:
        return jsonify({'message': 'Command not found'}), 400
    # Send manual command to robot
    robot.sendManual(command)
    return jsonify({}), 201


@robot_bp.route('/robots', methods=['GET'])
def get_robots():
    robot = Robot.query.all()
    response = []
    for robot in robot:
        response.append(robot.serialize)

    return jsonify({'robots': response}), 200


@robot_bp.route('/robots/<int:robot_id>', methods=['DELETE'])
@auth_required
def delete_robot(user, robot_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    robot = Robot.find_by_id(robot_id)
    if not robot:
        return jsonify({'message': 'Robot not found'}), 404

    robot.delete_from_db()
    return jsonify({'message': 'success'}), 200

