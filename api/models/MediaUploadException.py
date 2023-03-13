class MediaUploadException(Exception):
    def __init__(self, action, reason):
        self.action = action
        self.reason = reason