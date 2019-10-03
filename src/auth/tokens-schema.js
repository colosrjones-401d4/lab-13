'use strict';

const mongoose = require('mongoose');

const tokensSchema = mongoose.Schema({
  jwt: {type:String, required:true, unique:true},
});

module.exports = mongoose.model('tokensSchema', tokensSchema);