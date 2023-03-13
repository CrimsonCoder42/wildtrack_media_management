from flask import Flask, Response, request, send_from_directory
from flask_restful import Api
from flask_cors import CORS     # comment this on deployment
from api.MediaServiceApi import *
from api.MediaServiceApi2 import *
from api.DocumentDBClient import *
from api.DocumentDBClient2 import *
from api.AwsKeyProvider import *
from api.GeohashProvider import *
from api.AuthenticationValidator import *

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app) #comment this on deployment
api = Api(app)

API_PREFIX = "_api"
API_VERSION = "v1"
API_NAME = "media"
API_STR = f"/{API_PREFIX}/{API_VERSION}/{API_NAME}"
API_STR_V2 = f"/{API_PREFIX}/v2/{API_NAME}"


def token_required(f):

    def decorator(*args, **kwargs):
        token = None
        # ensure the jwt-token is passed with the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].replace("Bearer", "").strip()
        if not token:  # throw error if no token provided
            return Response(
                "Invalid token",
                status=401,
            )
        try:
            current_user = validate_token(token)
        except Exception:
            return Response(
                "Invalid token",
                status=401,
            )
        # Return the current_user information attached to the token
        return f(*args, **kwargs)
    return decorator


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route("/media-upload", defaults={'path':''})
@app.route('/media-upload/<path:path>')
def serve_react(path=None):
    return send_from_directory(app.static_folder,'index.html')


@app.get(f"{API_STR}/hello")
def hello():
    return {
            'message': 'Hello from the API'
        }


@app.get(f"{API_STR}/testauth")
@token_required
def hello():
    return {
            'message': 'Hello from the API'
        }


@app.get(f"{API_STR}/testdb")
def test_db():
    import pymongo
    client = pymongo.MongoClient(os.environ.get("DB_LOCAL"))
    db = client[os.environ.get("DB_NAME")]

    return {
            'message': db.list_collection_names()
        }


@app.get(f"{API_STR}/geohash")
def geohash():
    return get_geohash(request)


@app.get(f"{API_STR}/get-upload-url")
def get_upload_url():
    return generate_aws_url(request)


@app.get(f"{API_STR}/files")
def search_files():
    return MediaServiceApi(DocumentDBClient()).search_files(request)


@app.post(f"{API_STR}/file")
def create_file():
    return MediaServiceApi(DocumentDBClient()).create_file(request)


@app.get(f"{API_STR}/file/<id>")
def read_file(id):
    return MediaServiceApi(DocumentDBClient()).read_file(id)


@app.put(f"{API_STR}/file/<id>")
def update_file(id):
    return MediaServiceApi(DocumentDBClient()).update_file(id, request)


@app.delete(f"{API_STR}/file/<id>")
def delete_file(id):
    return MediaServiceApi(DocumentDBClient()).delete_file(id)


@app.get(f"{API_STR}/observations")
def search_observations():
    return MediaServiceApi(DocumentDBClient()).search_observations(request)


@app.post(f"{API_STR}/observation")
def create_observation():
    return MediaServiceApi(DocumentDBClient()).create_observation(request)


@app.get(f"{API_STR}/observation/<id>")
def read_observation(id):
    return MediaServiceApi(DocumentDBClient()).read_observation(id)


@app.put(f"{API_STR}/observation/<id>")
def update_observation(id):
    return MediaServiceApi(DocumentDBClient()).update_observation(id, request)


@app.delete(f"{API_STR}/observation/<id>")
def delete_observation(id):
    return MediaServiceApi(DocumentDBClient()).delete_observation(id)


@app.get(f"{API_STR}/animals")
def search_animals():
    return MediaServiceApi(DocumentDBClient()).search_animals(request)


@app.post(f"{API_STR}/animal")
def create_animal():
    return MediaServiceApi(DocumentDBClient()).create_animal(request)


@app.get(f"{API_STR}/animal/<id>")
def read_animal(id):
    return MediaServiceApi(DocumentDBClient()).read_animal(id)


@app.put(f"{API_STR}/animal/<id>")
def update_animal(id):
    return MediaServiceApi(DocumentDBClient()).update_animal(id, request)


@app.delete(f"{API_STR}/animal/<id>")
def delete_animal(id):
    return MediaServiceApi(DocumentDBClient()).delete_animal(id)


@app.get(f"{API_STR}/species")
def search_species():
    return MediaServiceApi(DocumentDBClient()).search_species(request)


@app.post(f"{API_STR}/species")
def create_species():
    return MediaServiceApi(DocumentDBClient()).create_species(request)


@app.get(f"{API_STR}/species/<id>")
def read_species(id):
    return MediaServiceApi(DocumentDBClient()).read_species(id)


@app.put(f"{API_STR}/species/<id>")
def update_species(id):
    return MediaServiceApi(DocumentDBClient()).update_species(id, request)


@app.delete(f"{API_STR}/species/<id>")
def delete_species(id):
    return MediaServiceApi(DocumentDBClient()).delete_species(id)


@app.errorhandler(403)
def access_forbidden(e):
    return {'status': 'Error', 'message': 'Access forbidden'}


@app.errorhandler(404)
def page_not_found(e):
    return {'status': 'Error', 'message': 'Route not supported'}


@app.errorhandler(405)
def method_not_allowed(e):
    return {'status': 'Error', 'message': 'Method not allowed'}


@app.errorhandler(500)
def internal_error(e):
    return {'status': 'Error', 'message': 'Internal server error'}


app.register_error_handler(403, access_forbidden)
app.register_error_handler(404, page_not_found)
app.register_error_handler(405, method_not_allowed)
app.register_error_handler(500, internal_error)

@app.get(f"{API_STR_V2}/species")
def list_species_2():
    return MediaServiceApi2(DocumentDBClient2()).list_species(request)

@app.post(f"{API_STR_V2}/species")
def create_species_v2():
    return MediaServiceApi2(DocumentDBClient2()).create_species(request)

@app.get(f"{API_STR_V2}/species/<id>")
def read_species_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).read_species(id)

@app.put(f"{API_STR_V2}/species/<id>")
def update_species_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).update_species(id, request)

@app.delete(f"{API_STR_V2}/species/<id>")
def delete_species_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).delete_species(id)

@app.get(f"{API_STR_V2}/animals")
def list_animals_2():
    return MediaServiceApi2(DocumentDBClient2()).list_animals(request)

@app.post(f"{API_STR_V2}/animal")
def create_animal_v2():
    return MediaServiceApi2(DocumentDBClient2()).create_animal(request)

@app.get(f"{API_STR_V2}/animal/<id>")
def read_animal_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).read_animal(id)

@app.put(f"{API_STR_V2}/animal/<id>")
def update_animal_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).update_animal(id, request)

@app.delete(f"{API_STR_V2}/animal/<id>")
def delete_animal_v2(id):
    return MediaServiceApi2(DocumentDBClient2()).delete_animal(id)

