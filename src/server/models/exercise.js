const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var Exercise = function({
  title,
  learn,
  time,
  gainedExp,
  experience,
  instructions,
  result,
  preCode,
  main
}) {
  this.title = title;
  this.learn = learn;
  this.time = time;
  this.experience = experience;
  this.gainedExp = gainedExp;
  this.instructions = instructions;
  this.result = result;
  this.preCode = preCode;
  this.main = main;
};

const exerciseSchema = {
  title: {
    type: String,
    required: true
  },
  time: {
    type: Number
  },
  experience: {
    type: Number
  },
  gainedExp: {
    type: Number
  },
  learn: {
    type: String,
    required: true
  },
  instructions: [{
    instruction: {
      type: String,
      required: true
    },
    state: {
      type: Number,
      default: 0
    },
    hint: {
      type: String
    },
    result : {
      type: String
    }
  }],
  preCode: {
    type: String
  },
  main: {
    type: String
  }
};

module.exports = {
  model: Exercise,
  schema: exerciseSchema
};
