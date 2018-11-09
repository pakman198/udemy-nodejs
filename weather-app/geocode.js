const request = require('request');

const geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const apiKey = 'AIzaSyA7v8ZpvFOAL4NBuOu4H3aXneXLWdhQQ74';

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers.');
        } else if(body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if(body.status === "OK") {
            const { formatted_address, geometry: { location }} = body.results[0];
            // console.log(`Adress: ${formatted_address}`);
            // console.log(`Latitude: ${location.lat}`);
            // console.log(`Longitude: ${location.lng}`);
            callback(undefined, {
                address: formatted_address,
                latitude: location.lat,
                longitude: location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
}