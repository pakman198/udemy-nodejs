const request = require('request');

const config = require('../keys');

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${config.darkSkyAPIKey}/${lat},${lng}?units=si`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to the Forecast.io servers.');
        }else if(response.statusCode === 400) {
            callback('Unable to fetch weather.')
        } else if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather');
        }
    });
}

module.exports = {
    getWeather
}

