from flask import Blueprint, request, jsonify

from models.job import Job
from utils.auth import auth_required
from controllers.packet import create_package

job_bp = Blueprint('job_bp', __name__)


@job_bp.route('/jobs', methods=['POST'])
@auth_required
def create_job(user):
    return 'OK', 200


@job_bp.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    response = []
    for job in jobs:
        response.append(job.serialize)

    return jsonify({'jobs': response}), 200


@job_bp.route('/jobs/<int:packet_id>', methods=['GET'])
def get_job(packet_id):
    job = Job.find_by_id(packet_id)
    if not job:
        return jsonify({'message': 'Job not found'}), 404

    response = job.serialize
    return jsonify({'job': response}), 200


@job_bp.route('/jobs/<int:packet_id>', methods=['PUT', 'PATCH'])
@auth_required
def update_job(user, packet_id):
    return 'OK', 200


@job_bp.route('/jobs/<int:packet_id>', methods=['DELETE'])
@auth_required
def delete_job(user, packet_id):
    if not user:
        return jsonify({'message': 'Not authorized'}), 401
    job = Job.find_by_id(packet_id)
    if not job:
        return jsonify({'message': 'Job not found'}), 404
    job.delete_from_db()
    return jsonify({'message': 'success'}), 200
