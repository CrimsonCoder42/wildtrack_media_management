from api.DocumentDBClient import Status, DocumentDBClientApi

import uuid

class MockRequest:

    form = {}

    def __init__(self, d):
        self.form = d


class MockDbClient(DocumentDBClientApi):

    species = []
    animals = []
    observations = []
    files = []

    def create_species(self, species):
        species._id = str(uuid.uuid4())
        self.species.append(species.__dict__)
        return {'status':  Status.Success, 'value': species._id}

    def search_species(self, query):
        result = []
        for s in self.species:
            for k,v in query.items():
                if s[k] == v:
                    result.append(s)
        return {'status':  Status.Success, 'value': result}
