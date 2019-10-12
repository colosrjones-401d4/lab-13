'use strict';

const mongoose = require('mongoose');
const schema = require('./tokens-schema');

class Token{

  constructor(){
  }

  get(jwt){
    let query = jwt ? {jwt} : {};
    return schema.find(query);
  }

  post(jwt){
    let newToken = new schema({jwt: jwt});
    return newToken.save();
  }

}

module.exports = Token;