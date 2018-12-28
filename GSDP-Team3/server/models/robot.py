from db import db
from models.base import Base
from RobotUTU.ManualPCTest import ManualRobot


class Robot(Base):
    __tablename__ = 'robot'

    robot_id = db.Column(db.Integer, primary_key=True)
    mac_address = db.Column(db.String)
    current_location_x = db.Column(db.Integer)
    current_location_y = db.Column(db.Integer)
    current_job = db.Column(db.Integer, db.ForeignKey('job.job_id'))

    def __init__(self, current_location_x, current_location_y, mac_address):
        self.current_location_x = current_location_x
        self.current_location_y = current_location_y
        self.mac_address = mac_address

    @property
    def serialize(self):
        return {
            'id': self.robot_id,
            'current_location_x': self.current_location_x,
            'current_location_y': self.current_location_y,
            'current_job': self.current_job,
            'mac_address': self.mac_address,
        }

    def assign_job(self, job_id):
        self.current_job = job_id

    def sendManual(self, message):
        self.manual.sendManualMessage(message)

    @classmethod
    def find_by_id(cls, robot_id):
        robot = cls.query.filter_by(robot_id=robot_id).first()
        robot.manual = ManualRobot(robot.mac_address)
        return robot
