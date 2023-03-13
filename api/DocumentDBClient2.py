from mongoengine import connect
import os

from api.models_v2.Species import Species
from api.models_v2.Animal import Animal


class DocumentDBClient2:

    def __init__(self):
        # v2 data goes to `mediaservice` database
        connect(db='mediaservice', host=os.environ.get('DB_LOCAL'))

    def list_species(self, form):
        return Species.objects(**form)

    def create_species(self, form):
        return Species(**form).save()

    def read_species(self, id):
        return Species.objects.get(id=id)

    def update_species(self, id, form):
        Species.objects(id=id).modify(**form)
        return Species.objects.get(id=id)

    def delete_species(self, id):
        return Species.objects.get(id=id).delete()

    def list_animals(self, form):
        animals_filter = dict(**form)
        species_filter = dict()
        for key in list(animals_filter):
            if key.startswith('species__'):
                species_filter[key[9:]] = animals_filter[key]
                del animals_filter[key]
        if species_filter:
            combined_filter = dict(**animals_filter)
            combined_filter['species__in'] = Species.objects.filter(**species_filter)
            return Animal.objects(**combined_filter).all()
        else:                
            return Animal.objects(**animals_filter)

    def create_animal(self, form):
        data = dict(**form)
        if 'species__id' in data:
            species = Species.objects.get(id=data['species__id'])
            del data['species__id']
        animal = Animal(**data)
        if species is not None:
            animal.species = species
        return animal.save()

    def read_animal(self, id):
        return Animal.objects.get(id=id)

    def update_animal(self, id, form):
        data = dict(**form)
        if 'species__id' in data:
            data['species'] = Species.objects.get(id=data['species__id'])
            del data['species__id']
        Animal.objects(id=id).modify(**data)
        return Animal.objects.get(id=id)

    def delete_animal(self, id):
        return Animal.objects.get(id=id).delete()
