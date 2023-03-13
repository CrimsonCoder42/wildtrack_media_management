from mongoengine import *

from api.models_v2.Species import Species

from api.models.Enums import *


class Animal(Document):

    species = LazyReferenceField(Species)
    name = StringField(max_length=50, required=True)
    birthdate = DateField()
    sex = EnumField(Sex, default=Sex.unknown)
    environment = EnumField(Environment, default=Environment.wild)
    organizations = ListField(StringField(max_length=50))
    notes = StringField(max_length=200)
    photos = ListField(field=URLField())

    meta = {
        'indexes': [
            'name',
            'birthdate',
            'sex',
            'environment',
            'species.common_name'
        ]
    }

    def __dict__(self):
        return {
            '_id': str(self.id),
            'name': self.name,
            'species': self.species.fetch().__dict__() if self.species else {},
            'birthdate': self.birthdate if self.birthdate else "",
            'sex': str(self.sex) if self.sex else "",
            'environment': str(self.environment) if self.environment else "",
            'organizations': self.organizations,
            'notes': self.notes if self.notes else "",
            'photos': [str(url) for url in self.photos]
        }
