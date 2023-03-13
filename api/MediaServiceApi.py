from api.models.MediaFile import MediaFile
from api.models.Observation import Observation
from api.models.Animal import Animal
from api.models.Species import Species

from api.DocumentDBClient import Status


def objIdToStr(d):
    if '_id' in d:
        d['_id'] = str(d['_id'])
    return d


def list(list_fn) -> dict:
    def _list(self, request):
        result = list_fn(self, request)
        if result['status'] == Status.Success:
            return {
                'status': 'Success',
                'items': [objIdToStr(s) for s in result['value']]
            }
        else:
            return {
                'status': 'Error',
                'error': str(result['error'])
            }
    return _list


def create(create_fn) -> dict:
    def _create(self, request):
        result = create_fn(self, request)
        if result['status'] == Status.Success:
            return {
                'status': 'Success',
                '_id': str(result['value'])
            }
        else:
            return {
                'status': 'Error',
                'error': str(result['error'])
            }
    return _create


def read(read_fn) -> dict:
    def _read(self, id):
        result = read_fn(self, id)
        if result['status'] == Status.Success:
            return {
                'status': 'Success',
                'item': objIdToStr(result['value'])
            }
        else:
            return {
                'status': 'Error',
                'error': str(result['error'])
            }
    return _read


def update(update_fn) -> dict:
    def _update(self, id, request):
        result = update_fn(self, id, request)
        if result['status'] == Status.Success:
            return {
                'status': 'Success',
                'item': objIdToStr(result['value'])
            }
        else:
            return {
                'status': 'Error',
                'error': str(result['error'])
            }
    return _update


def delete(delete_fn) -> dict:
    def _delete(self, id):
        result = delete_fn(self, id)
        if result['status'] == Status.Success:
            return {
                'status': 'Success',
            }
        else:
            return {
                'status': 'Error',
                'error': str(result['error'])
            }
    return _delete


class MediaServiceApi:

    db_client = None

    def __init__(self, db_client):
        self.db_client = db_client

    @list
    def search_files(self, request) -> dict:
        return self.db_client.search_files(request.form)

    @create
    def create_file(self, request) -> dict:
        return self.db_client.create_file(MediaFile(request.form))

    @read
    def read_file(self, id) -> dict:
        return self.db_client.read_file(id)

    @update
    def update_file(self, id, request) -> dict:
        return self.db_client.update_file(id, MediaFile(request.form))

    @delete
    def delete_file(self, id) -> dict:
        return self.db_client.delete_file(id)

    @list
    def search_observations(self, request) -> dict:
        return self.db_client.search_observations(request.form)

    @create
    def create_observation(self, request) -> dict:
        return self.db_client.create_observation(Observation(request.form))

    @read
    def read_observation(self, id) -> dict:
        return self.db_client.read_observation(id)

    @update
    def update_observation(self, id, request) -> dict:
        return self.db_client.update_observation(id, Observation(request.form))

    @delete
    def delete_observation(self, id) -> dict:
        return self.db_client.delete_observation(id)

    @list
    def search_animals(self, request) -> dict:
        return self.db_client.search_animals(request.form)

    @create
    def create_animal(self, request) -> dict:
        return self.db_client.create_animal(Animal(request.form))

    @read
    def read_animal(self, id) -> dict:
        return self.db_client.read_animal(id)

    @update
    def update_animal(self, id, request) -> dict:
        return self.db_client.update_animal(id, Animal(request.form))

    @delete
    def delete_animal(self, id) -> dict:
        return self.db_client.delete_animal(id)

    @list
    def search_species(self, request) -> dict:
        return self.db_client.search_species(request.form)

    @create
    def create_species(self, request) -> dict:
        return self.db_client.create_species(Species(request.form))

    @read
    def read_species(self, id) -> dict:
        return self.db_client.read_species(id)

    @update
    def update_species(self, id, request) -> dict:
        return self.db_client.update_species(id, Species(request.form))

    @delete
    def delete_species(self, id) -> dict:
        return self.db_client.delete_species(id)