import requests

# This should be provided by User module once deployed
VERIFY_URL = "http://127.0.0.1:5000/_api/v1/user/verify"


def validate_token(token):
    headers = {
      'Authorization': f"Bearer {token}"
    }
    return requests.request("GET", VERIFY_URL, headers=headers, data="").text
