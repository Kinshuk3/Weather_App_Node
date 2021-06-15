//---GEOcoding-----
// Address-> Lat/Long -> Weather

const request = require('request');

const geocode = (address,callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2luc2h1azMiLCJhIjoiY2twdG9rZXJyMGVmbjMycXdjZDE0ZmtoayJ9.LjolYPVOG--qZ05MImdQMw&limit=1';

    request({url ,json: true}, (err,{ body } = {}) =>{
        if(err){
            callback('Unable to connect to Location Services at the time!');
        }
        else if(body.features.length === 0){
            callback('Unable to find the searched Location!');
        }
        else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            };
            callback(undefined, data);
        }
    })

}

module.exports = geocode;