const request = require('request');

const getGeoCode = (location, callback) => {
    const geoUrl = `http://api.positionstack.com/v1/forward?access_key=1ac2f8a318acaf426a5ce5b7db9e47e6&query=${location}`

    request({url: geoUrl, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to Geo Location service!');
        } else if(body.error) {
            callback('Unable to find geo location!');
        } else {
            callback(undefined, {
                'name' : body.data[0].name,
                'latitude' : body.data[0].latitude,
                'longitude' : body.data[0].longitude
            });
        }
    })
}

module.exports = getGeoCode;