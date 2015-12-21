'use strict';
const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const locationTypes = ['indoor', 'outdoor'];

const gardenSchema = Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: locationTypes
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    modules: [{
        type: Schema.Types.ObjectId,
        ref: 'Modules'
    }]
});

module.exports = mongoose.model('Garden', gardenSchema, 'garden');
