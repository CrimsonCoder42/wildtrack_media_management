from mongoengine import *
from api.models.Enums import *


class MediaFile(EmbeddedDocument):

    s3_url = URLField()
    s3_thumbnail_url = URLField()
    original_filename = StringField(max_length=100)
    file_type = EnumField(FileType)
    file_subtype = EnumField(FileSubType)
    foot = EnumField(Foot)
    uploaded_at = DateTimeField()
    captured_at = DateTimeField()
    latitude = FloatField(min_value=-90, max_value=90)
    longitude = FloatField(min_value=-180, max_value=180)
    geohash = StringField(max_length=8)
    comment = StringField(max_length=200)

    reviewer_foot = EnumField(Foot)
    reviewer_rating = IntField()
    reviewed_at = DateTimeField()
    reviewer_id = UUIDField()
    reviewer_comment = StringField(max_length=200)

    meta = {
        'indexes': [
            'file_type',
            'file_subtype',
            'foot',
            'uploaded_at',
            'captured_at',
            'latitude',
            'longitude',
            ('latitude', 'longitude'),
            'geohash',
            'reviewer_rating',
            'reviewer_foot',
            'reviewed_at',
            'reviewer_id'
        ]
    }
