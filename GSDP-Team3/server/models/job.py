from db import db
from models.base import Base


class Job(Base):
    __tablename__ = 'job'

    job_id = db.Column(db.Integer, primary_key=True)
    robot_id = db.Column(db.Integer, db.ForeignKey('robot.robot_id'))
    packet_id = db.Column(db.Integer, db.ForeignKey('packet.packet_id'))
    # Order isn't implemented
    order_number = db.Column(db.Integer)
    progress = db.Column(db.String)

    def __init__(self, robot_id, packet_id, order_number, progress):
        self.robot_id = robot_id
        self.packet_id = packet_id
        self.order_number = order_number
        self.progress = progress

    @property
    def serialize(self):
        return {
            'robot_id': self.robot_id,
            'packet_id': self.packet_id,
            'order_number': self.order_number,
            'progress': self.progress
        }

    @classmethod
    def find_by_id(cls, job_id):
        job = cls.query.filter_by(job_id=job_id).first()
        return job
