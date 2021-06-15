const request = require('request');

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=b2d16e22d4e80909fb241453ef2ad4b6&query=' + latitude + ',' + longitude;

    request({url, json:true}, (err,{ body }) =>{

        if(err){
            callback('Unable to connect to the weather Data!', undefined);
        }
        else if(body.error){
            callback('Unable to Locate with specified Lat/Long', undefined);
        }
        else{
            const data = {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                precipitation: body.current.precip,
                humidity: body.current.humidity
            }
            callback(undefined, `It is currently ${data.description}. It is ${data.temperature} degrees out. It feels like ${data.precipitation} % chances of rain out. The humidity is ${data.humidity}%`);
        }
    })
}

module.exports = forecast;