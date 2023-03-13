import pygeohash


def get_geohash(request):
    form = request.form
    if 'latitude' in form and 'longitude' in form:
        try:
            return {
                'geohash': pygeohash.encode(float(form['latitude']), float(form['longitude']))
            }
        except Exception as err:
            return {
                'error': str(err)
            }
    else:
        return {
            'error': 'latitude and longitude are required'
        }
