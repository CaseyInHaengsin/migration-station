'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    zipCode: Number,
    email: String,
    appointments: {type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'},
});

  

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);