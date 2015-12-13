const mongoose   = require('mongoose');
mongoose.promise = require('bluebird');
const Schema     = mongoose.Schema;

const sensorDataSchema = Schema({
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
    },
    timeRecorded: {
        type: Date,
        required: true
    },
    timeLogged: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('SensorData', sensorDataSchema, 'sensorData');
