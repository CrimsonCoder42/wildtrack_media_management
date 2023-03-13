import boto3
import uuid
from flask import jsonify
import os
import mimetypes


def generate_aws_url(request):

    s3 = boto3.client("s3")
    bucket_name = os.environ.get("AWS_S3_BUCKET")
    key = str(uuid.uuid4())

    # Try to get file extension from Content-Type header
    content_type = request.headers["Content-Type"] if "Content-Type" in request.headers else ""

    if 'key' in request.form:
        key = request.form['key']
    
    fields = {}
    if 'Content-Type' in request.form:
        fields['Content-Type'] = request.form['Content-Type']
   
        content_type = fields['Content-Type']

    # Default file extension in case content type is not provided
    extension = ".jpeg"

    # Try to get file extension from Content-Type header and then guess it from the file
    if len (content_type) > 0:
        extension = mimetypes.guess_extension(content_type)
        
    conditions = [
        {"acl": "public-read"}
    ]
    presigned_post = s3.generate_presigned_post(bucket_name, key + extension, fields, conditions, ExpiresIn=3600) # URL valid for 1 hour (3600 seconds)
    return jsonify({
        'data': presigned_post,
        'url': f"https://{bucket_name}.s3.amazonaws.com/{key + extension}"
    })