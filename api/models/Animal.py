class Animal:

    _id = None           # unique animal individual ID
    species_id = None    # ID of the species it belongs to

    name = None 
    birthdate = None
    sex = None 
    environment = None
    organizations = None
    notes = None
    pictures = None
    
    def __init__(self, dict):
        if dict:
            for k, v in dict.items():
                if hasattr(self, k):
                    setattr(self, k, v)
