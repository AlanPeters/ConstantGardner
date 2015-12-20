'use strict';
const mongoose = require('mongoose');
var Schema     = mongoose.Schema;

var sensorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sensors', sensorSchema, 'sensors');
