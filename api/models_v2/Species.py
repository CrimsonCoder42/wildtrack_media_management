from mongoengine import Document, StringField, ListField, URLField


class Species(Document):

    common_name = StringField(max_length=50, required=True)
    genus_name = StringField(max_length=50)
    species_name = StringField(max_length=50)
    subspecies_name = StringField(max_length=50)
    photos = ListField(field=URLField())

    meta = {
        'indexes': [
            'common_name',
            'genus_name',
            'species_name',
            'subspecies_name'
        ]
    }

    def __dict__(self):
        return {
            '_id': str(self.id),
            'common_name': self.common_name,
            'genus_name': self.genus_name if self.genus_name else "",
            'species_name': self.species_name if self.species_name else "",
            'subspecies_name': self.subspecies_name if self.subspecies_name else "",
            'photos': [str(url) for url in self.photos]
        }
