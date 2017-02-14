// ****************************************************************************
// MealModel
// ****************************************************************************
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AvailabilitySchema = new Schema({
    availability: {
        type: Number,
        required: true,
        default: 0
    },
    nextAvailabilityDate: Date,
    adminOpened: {
        type: Boolean,
        required: false,
        default: false
    }
});

mongoose.model('Availability', AvailabilitySchema);