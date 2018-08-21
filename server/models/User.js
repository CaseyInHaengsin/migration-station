'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

  

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);