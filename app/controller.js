const dropletUtils = require('./droplet-utils');

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