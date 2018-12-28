from db import db
from models.base import Base
from models.packet import Packet

class Shelf(Base):
    __tablename__ = 'shelf'

    shelf_id = db.Column(db.Integer, primary_key=True)
    location_x = db.Column(db.Integer)
    location_y = db.Column(db.Integer)
    packets = db.relationship('Packet', backref='shelf', lazy='dynamic')

    def __init__(self, location_x, location_y):
        self.location_x = location_x
        self.location_y = location_y

    @property
    def serialize(self):
        return {
            'shelf_id': self.shelf_id,
            'location_x': self.location_x,
            'location_y': self.location_y
        }

    @classmethod
    def find_by_id(cls, shelf_id):
        packet = cls.query.filter_by(shelf_id=shelf_id).first()
        return packet
