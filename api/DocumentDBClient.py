import pymongo
from pymongo.collection import ReturnDocument
from bson.objectid import ObjectId
from enum import Enum
import os

from api.models.MediaFile import MediaFile
from api.models.Observation import Observation
from api.models.Animal import Animal
from api.models.Species import Species

# below are the collection names for each type of document
MEDIA_FILE_COLLECTION = "files"
OBSERVATION_COLLECTION = "observations"
ANIMAL_COLLECTION = "animals"
SPECIES_COLLECTION = "species"


def sanitize_id(dict):
    if '_id' in dict:
        del dict['_id']
    return dict


class Status(Enum):
    Success = 0,
    InvalidId = 1,
    ItemNotFound = 2,
    FailedToCreate = 3,
    FailedToDelete = 4,
    OtherError = 5
    

class DocumentDBClientApi:

    def search_files(self, query):
        pass

    def create_file(self, file):
        pass 

    def read_file(self, id):
        pass 

    def update_file(self, id, file):
        pass 

    def delete_file(self, id):
        pass

    def search_observations(self, query):
        pass

    def create_observation(self, observation):
        pass 

    def read_observation(self, id):
        pass 

    def update_observation(self, id, observation):
        pass 

    def delete_observation(self, id):
        pass

    def search_animals(self, query):
        pass

    def create_animal(self, animal):
        pass

    def read_animal(self, id):
        pass 

    def update_animal(self, id, animal):
        pass 

    def delete_animal(self, id):
        pass

    def search_species(self, query):
        pass

    def create_species(self, species):
        pass

    def read_species(self, id):
        pass 

    def update_species(self, id, species):
        pass 

    def delete_species(self, id):
        pass


class DocumentDBClient(DocumentDBClientApi):

    db = None

    def __init__(self):
        client = pymongo.MongoClient(os.environ.get("DB_LOCAL"))
        self.db = client[os.environ.get("DB_NAME")]

    def _search(self, collection, query) -> dict:
        try:
            results = self.db[collection].find(query)
            return {'status': Status.Success, 'value': results}
        except Exception as e:
            return {'status': Status.OtherError, 'error': e}

    def _create(self, collection, item) -> dict:
        try:
            result = self.db[collection].insert_one(sanitize_id(item.__dict__))
            if result:
                return {'status': Status.Success, 'value': result.inserted_id}
            else:
                return {'status': Status.FailedToCreate, 'error': 'Unable to create'}
        except Exception as e:
            return {'status': Status.OtherError, 'error': e}

    def _read(self, collection, id) -> dict:
        try:
            result = self.db[collection].find_one(ObjectId(id))
            if result:
                return {'status': Status.Success, 'value': result}
            else:
                return {'status': Status.ItemNotFound, 'error': 'Item not found'}
        except Exception as e:
            return {'status': Status.OtherError, 'error': e}

    def _update(self, collection, id, object) -> dict:
        try:
            item = self.db[collection].find_one(ObjectId(id))
            if not item:
                return {'status': Status.ItemNotFound, 'error': 'Item not found'}
            else:
                content = {**item, **sanitize_id(object.__dict__)}
                result = self.db[collection].find_one_and_replace({'_id': ObjectId(id)}, content, return_document=ReturnDocument.AFTER)
                if result:
                    return {'status': Status.Success, 'value': result}
                else:
                    return {'status': Status.ItemNotFound, 'error': 'Item not found'}
        except Exception as e:
            return {'status': Status.OtherError, 'error': e}

    def _delete(self, collection, id) -> dict:
        try:
            result = self.db[collection].delete_one({'_id': ObjectId(id)})
            if result:
                return {'status': Status.Success, 'value': result.acknowledged}
            else:
                return {'status': Status.FailedToDelete, 'error': 'Unable to delete'}
        except Exception as e:
            return {'status': Status.OtherError, 'error': e}

    def search_files(self, query) -> dict:
        return self._search(MEDIA_FILE_COLLECTION, query)

    def create_file(self, file) -> dict:
        return self._create(MEDIA_FILE_COLLECTION, file)

    def read_file(self, id) -> dict:
        return self._read(MEDIA_FILE_COLLECTION, id)

    def update_file(self, id, file) -> dict:
        return self._update(MEDIA_FILE_COLLECTION, id, file)

    def delete_file(self, id) -> dict:
        return self._delete(MEDIA_FILE_COLLECTION, id)

    def search_observations(self, query) -> dict:
        return self._search(OBSERVATION_COLLECTION, query)

    def create_observation(self, observation) -> dict:
        return self._create(OBSERVATION_COLLECTION, observation)

    def read_observation(self, id) -> dict:
        return self._read(OBSERVATION_COLLECTION, id)

    def update_observation(self, id, observation) -> dict:
        return self._update(OBSERVATION_COLLECTION, id, observation)

    def delete_observation(self, id) -> dict:
        return self._delete(OBSERVATION_COLLECTION, id)

    def search_animals(self, query) -> dict:
        return self._search(ANIMAL_COLLECTION, query)

    def create_animal(self, animal) -> dict:
        return self._create(ANIMAL_COLLECTION, animal)

    def read_animal(self, id) -> dict:
        return self._read(ANIMAL_COLLECTION, id)

    def update_animal(self, id, animal) -> dict:
        return self._update(ANIMAL_COLLECTION, id, animal)

    def delete_animal(self, id) -> dict:
        return self._delete(ANIMAL_COLLECTION, id)

    def search_species(self, query) -> dict:
        return self._search(SPECIES_COLLECTION, query)

    def create_species(self, species) -> dict:
        return self._create(SPECIES_COLLECTION, species)

    def read_species(self, id) -> dict:
        return self._read(SPECIES_COLLECTION, id)

    def update_species(self, id, species) -> dict:
        return self._update(SPECIES_COLLECTION, id, species)

    def delete_species(self, id) -> dict:
        return self._delete(SPECIES_COLLECTION, id)
