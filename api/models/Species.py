class Species:

    _id = None
    common_name = None
    genus_name = None
    latin_name = None
    sub_species = None
    pictures = None

    def __init__(self, dict):
        if dict:
            for k, v in dict.items():
                if hasattr(self, k):
                    setattr(self, k, v)
