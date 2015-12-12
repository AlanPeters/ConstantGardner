const mongoose = require('mongoose');
var Schema     = mongoose.Schema;

var sensorDataSchema = Schema({
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'sensors',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema, 'sensorData');
