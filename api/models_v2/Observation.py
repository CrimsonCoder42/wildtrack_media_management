from mongoengine import *
from api.models.Enums import *

from api.models_v2.MediaFile import MediaFile
from api.models_v2.Animal import Animal
from api.models_v2.Species import Species


class Observation(Document):

    media_files = ListField(EmbeddedDocumentField(MediaFile))
    user_id = UUIDField()
    animal = LazyReferenceField(Animal)
    species = LazyReferenceField(Species)
    comment = StringField(max_length=200)
    status = EnumField(ObservationStatus)
    source = EnumField(Source)
    submitted_at = DateTimeField()

    reviewer_animal = LazyReferenceField(Animal)
    reviewer_species = LazyReferenceField(Species)
    reviewed_at = DateTimeField()
    reviewer_id = UUIDField()
    reviewer_comment = StringField(max_length=200)

    meta = {
        'indexes': [
            'user_id',
            'animal.name',
            'species.common_name',
            'status',
            'source',
            'submitted_at',
            'reviewed_at',
            'reviewer_id'
        ]
    }
