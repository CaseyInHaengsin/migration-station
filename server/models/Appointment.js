'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var AppointmentsSchema = new Schema({
    date: Date,
    license: String,
    status: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

  

//export our module to use in server.js
module.exports = mongoose.model('Appointment', AppointmentsSchema);