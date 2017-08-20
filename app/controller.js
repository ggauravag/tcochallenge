const dropletUtils = require('./droplet-utils');
const request = require('request');
const digitalocean = require('digitalocean');

exports.getDropletDetails = function (req, res) {
    dropletUtils.getDropletDetails(function (err, details) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(details);
        }
    })
};

exports.getHandleName = function (req, res) {
    res.json({handle: 'ggauravag'});
};

exports.getClientDropletDetails = function (req, res) {
    var accessCode = req.code;
    request({
        uri: 'https://cloud.digitalocean.com/v1/oauth/token?client_id=61de28bfd1b5782f984fdda0fdcdd500b6908359c2c75eb53b064674fbb9a613&client_secret=423a852d336681849b03ab0a77eed3412af2e0da93ffbabe329943d31f732b30&grant_type=authorization_code&code=' + accessCode + '&redirect_uri=http://139.59.0.169/oauth-handler'
    }, function (err, res, body) {
        if (err) {
            res.status(500).json(err);
        } else if (res.statusCode >= 200 && res.statusCode < 300) {
            var details = JSON.parse(body);
            var accessToken = details.access_token;
            var client = digitalocean.client(accessToken);
            client.droplets.list().then(function(droplets) {
                var droplet = droplets[0];
                res.json(droplet);
            })
        } else {
            res.status(500).json(body);
        }
    })
};