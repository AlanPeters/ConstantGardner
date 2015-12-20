'use strict';
const express    = require('express');
const router     = express.Router();
const sensorData = require('../controllers/sensorData');

router.post('/', function(req, res, next) {
    return sensorData.insertData(req.body)
    .then(function(newDoc) {
        return res.json(newDoc);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
    return sensorData.getData(req.query)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

router.get('/latest', function(req, res, next) {
    return sensorData.getLatest(req.query.type)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

module.exports = router;
