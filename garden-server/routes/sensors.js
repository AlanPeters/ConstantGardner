const express    = require('express');
const router     = express.Router();
//const sensorData = require('../controllers/sensorData');
// FIXME use controller
const sensorData = require('../models/sensorData');

router.post('/', function(req, res, next) {
    return sensorData.create(req.body)
    .then(function(newDoc) {
        return res.json(newDoc);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
});

router.put('/', function(req, res, next) {
});

module.exports = router;
