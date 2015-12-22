'use strict';
const express = require('express');
const router  = express.Router();
const garden  = require('../controllers/garden');

router.post('/', function(req, res, next) {
    return garden.createNewGarden(req.body, req.user._id)
    .then(function(newDoc) {
        return res.json(newDoc);
    })
    .catch(next);
});

router.get('/owner', function(req, res, next) {
    return garden.getByOwner(req.user._id)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

router.get('/participant', function(req, res, next) {
    // TODO find a way to turn off the moronic id override.
    // req.user only has _id property, but id works as well,
    // its stupid and it pisses me off, issue open on passport repo
    return garden.getByParticipant(req.user._id)
    .then(function(data) {
        return res.json(data);
    })
    .catch(next);
});

module.exports = router;
