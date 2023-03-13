class MediaFile:

    _id = None               # unique ID of the media file
    file_id = None           # unique ID of media file on S3
    bucket_id = None         # unique ID of the S3 bucket
    version_id = None        # S3 version ID
    observation_id = None    # unique ID of the observation containing the file
    user_id = None           # unique ID of the user that uploaded the file
    s3_full_path = None      # full path of the file on S3
    original_filename = None # original name of the user file
    s3_thumbnail_path = None # full path of thumbnail on S3

    file_type = None         # Type FileType
    body_part = None         # Type BodyPart
    foot = None              # Type Footprint
    upload_datetime = None
    capture_datetime = None
    latitude = None
    longitude = None
    geohash = None
    comment = None

    def __init__(self, dict):
        if dict:
            for k, v in dict.items():
                if hasattr(self, k):
                    setattr(self, k, v)

