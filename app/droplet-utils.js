const DIGITALOCEAN = require('dropletapi').Droplets;

var digitalocean = new DIGITALOCEAN('b2c9e304d6a68e764cdd43bd9b9159e27d422c1d5af1ebc6524826976266f252');

module.exports.getDropletDetails = function (callback) {
    digitalocean.getDropletById('59133263', function (error, result) {
        if (error) {
            console.log(error);
            callback(error);
        }
        else {
            console.log(result);
            callback(undefined, result);
        }
    });
}


