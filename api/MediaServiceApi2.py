from flask import Response
from mongoengine.queryset.queryset import QuerySet


def error_handled(fn):
    def run(self, *args):
        try:
            result = fn(self, *args)
            if type(result) is QuerySet:
                return [r.__dict__() for r in result]
            elif result:
                return result.__dict__()
            else:
                # delete methods return None in case of success
                return Response('success', status=200)
        except Exception as e:
            return Response(str(e), status=400)
    return run


class MediaServiceApi2:

    db_client = None

    def __init__(self, db_client):
        self.db_client = db_client

    @error_handled
    def list_species(self, request) -> dict:
        return self.db_client.list_species(request.form)

    @error_handled
    def create_species(self, request) -> dict:
        return self.db_client.create_species(request.form)

    @error_handled
    def read_species(self, id) -> dict:
        return self.db_client.read_species(id)

    @error_handled
    def update_species(self, id, request) -> dict:
        return self.db_client.update_species(id, request.form)

    @error_handled
    def delete_species(self, id) -> dict:
        return self.db_client.delete_species(id)

    @error_handled
    def list_animals(self, request) -> dict:
        return self.db_client.list_animals(request.form)

    @error_handled
    def create_animal(self, request) -> dict:
        return self.db_client.create_animal(request.form)

    @error_handled
    def read_animal(self, id) -> dict:
        return self.db_client.read_animal(id)

    @error_handled
    def update_animal(self, id, request) -> dict:
        return self.db_client.update_animal(id, request.form)

    @error_handled
    def delete_animal(self, id) -> dict:
        return self.db_client.delete_animal(id)


