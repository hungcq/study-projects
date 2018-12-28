from db import db
from models.base import Base
from models.job import Job

class Packet(Base):
    __tablename__ = 'packet'

    packet_id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.Integer)
    length = db.Column(db.Integer)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.shelf_id'))
    light_param = db.Column(db.Float)
    temp_param = db.Column(db.Float)

    jobs = db.relationship('Job', backref='packet', lazy='dynamic')

    def __init__(self, barcode, length, width, height, shelf_id, light_param, temp_param):
        self.barcode = barcode
        self.length = length
        self.width = width
        self.height = height
        self.shelf_id = shelf_id
        self.light_param = light_param
        self.temp_param = temp_param

    @property
    def serialize(self):
        return {
            'packet_id': self.packet_id,
            'barcode': self.barcode,
            'length': self.length,
            'width': self.width,
            'height': self.height,
            'light_param': self.light_param,
            'temp_param': self.temp_param
        }

    @classmethod
    def find_by_id(cls, packet_id):
        packet = cls.query.filter_by(packet_id=packet_id).first()
        return packet
