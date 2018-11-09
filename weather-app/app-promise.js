const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
    address: {
        demand: true,
        alias: 'a',
        describe: 'Adress to fetch weather for',
        string: true
    }
}).help()
.alias('help', 'h')
.argv;

const encodedAddress = encodeURIComponent(argv.address);
const googleApiKey = 'AIzaSyA7v8ZpvFOAL4NBuOu4H3aXneXLWdhQQ74';
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

axios.get(geocodeUrl)
.then(response => {
    const { data } = response;
    if(data.status === 'ZERO_RESULTS') {
        //throwing an error stops execution and moves to the catch statement
        throw new Error('Unable to find that address.');
    }

    const { formatted_address, geometry: { location: { lat, lng}}} = data.results[0];
    const weatherApiKey = "f9efd8a81e7bfadcd64e4cfeb796553f";
    const weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?units=si`;
    console.log(formatted_address);

    return axios.get(weatherUrl);
})
.then(response => {
    const { currently: { temperature, apparentTemperature}} = response.data;
    console.log(`It's currently: ${temperature} °C. It feels like: ${apparentTemperature} °C.`);

}).catch(err => {
    if(err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});

