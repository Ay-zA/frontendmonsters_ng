const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var Exam = function({
  title,
  questions,
  isDone,
  point,
  time
}) {
  this.title = title;
  this.questions = questions;
  this.isDone = isDone;
  this.point = point;
  this.time = time;
};

const examSchema = {
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    isDone: {
      type: Boolean
    },
    point: {
      type: Number
    }
  }],
  isDone: {
    type: Boolean
  },
  time: {
    type: Number
  },
  point: {
    type: Number
  }
};

module.exports = {
  model: Exam,
  schema: examSchema
};
