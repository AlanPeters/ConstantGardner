'use strict';
const mongoose = require('mongoose');
var Schema     = mongoose.Schema;

var moduleSchema = Schema({
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
    },
    sensors: [{
        type: Schema.Types.ObjectId,
        ref: 'Sensors'
    }]
});

module.exports = mongoose.model('Module', moduleSchema, 'module');
