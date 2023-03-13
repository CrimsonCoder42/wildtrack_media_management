class InvalidIdException(RuntimeError):

    id = None 

    def __init__(self, id):
        self.id = id 

    def __str__(self):
        return f"ID is in wrong format: {str(self.id)}"


class ItemNotFoundException(RuntimeError):

    id = None 

    def __init__(self, id):
        self.id = id 

    def __str__(self):
        return f"Item with ID not found: {str(self.id)}"


class MissingMandatoryKeyException(RuntimeError):

    keys = []

    def __init__(self, keys):
        self.keys = keys 

    def __str__(self):
        return f"Mandatory keys not found: {str(self.keys)}"