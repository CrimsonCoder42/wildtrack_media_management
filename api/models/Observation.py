class Observation:

    _id = None                  # unique ID of the observation containing the file
    file_ids = []               # array of unique S3 keys of the media files
    user_id = None              # unique ID of the user that submitted the observation
    animal_id = None            # unique ID of the animal instance, optional
    species_id = None           # unique ID of the species

    comment = ""                # general comment of the whole observation
    status = True               # observation status
    source = None               # the user device
    datetime = None             # when the observation is submitted

    file_type = None            # Type FileType
    body_part = None            # Type BodyPart

    reviewed_at = None 
    reviewer_id = None 
    reviewer_comment = None

    def __init__(self, dict):
        if dict:
            for k, v in dict.items():
                if hasattr(self, k):
                    setattr(self, k, v)
