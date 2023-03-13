import sys
import pytest

sys.path.append('../../')

from MockDBClient import MockDbClient, MockRequest
from api.MediaServiceApi import MediaServiceApi


class TestSpecies:

    mapi = MediaServiceApi(MockDbClient())

    def test_create_species(self):
        common_name = 'Penguin'
        create_result = self.mapi.create_species(MockRequest({'common_name': common_name}))
        assert create_result['status'] == 'Success'
        search_result = self.mapi.search_species(MockRequest({'common_name': common_name}))
        assert search_result['status'] == 'Success'
        assert search_result['items'][0]['_id'] == create_result['_id']
        assert search_result['items'][0]['common_name'] == common_name
