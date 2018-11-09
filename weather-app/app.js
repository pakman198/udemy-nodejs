const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

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

geocode.geocodeAddress(argv.address, (error, results) => {
    if(error) {
        console.log(error);
    } else {
        const { address, latitude, longitude } = results;
        console.log(address);
        weather.getWeather(latitude, longitude, (error, weatherResults) => {
            if(error) {
                console.log(error);
            } else {
                const { temperature, apparentTemperature } = weatherResults;
                console.log(`It's currently: ${temperature} °C. It feels like: ${apparentTemperature} °C.`);
            }
        });
    }
});
