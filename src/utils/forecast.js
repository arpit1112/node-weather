const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e34b6eeb1fdff67ab0cbd8fe4caf7bdb&query=${lat},${long}`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!');
        } else if(body.error) {
            callback('Unable to find the location');
        } else {
            callback(undefined ,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. it feels like ${body.current.feelslike} degress out.`);
        }
    })
}

module.exports = forecast;