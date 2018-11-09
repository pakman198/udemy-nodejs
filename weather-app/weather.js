const request = require('request');

const apiKey = "f9efd8a81e7bfadcd64e4cfeb796553f";

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=si`,
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

