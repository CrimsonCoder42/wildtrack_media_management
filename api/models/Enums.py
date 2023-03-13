from enum import Enum


class FileSubType(Enum):
    footprint = 1
    trackplate = 2
    carapace = 3
    whole_body = 4
    no_foot_data = 5


class Environment(Enum):
    captive = 1
    wild = 2


class FileType(Enum):
    image = 1
    video = 2
    audio = 3
    annotation = 4


class Foot(Enum):
    left_front = 1
    right_front = 2
    left_hind = 3
    right_hind = 4
    unknown = 5
    multiple_foot = 6


class Sex(Enum):
    female = 1
    male = 2
    unknown = 3


class ObservationStatus(Enum):
    draft = 1
    submitted = 2
    under_review = 3 
    reviewed = 4
    deleted = 5


class Source(Enum):
    web_app = 1
    mobile_app = 2
