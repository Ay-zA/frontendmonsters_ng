const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const exerciseModel = require('./exercise').schema;
const examModel = require('./exam').schema;


var Lesson = function({
  uTitle,
  title,
  exercises,
  exams
}) {
  this.uTitle = uTitle;
  this.title = title;
  this.exercises = exercises;
  this.exams = exams;
};

const lessonSchema = {
  uTitle: {
    type: String,
    lowercase: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  exercises: [exerciseModel],
  exams: [examModel]
};

module.exports = {
  model: Lesson,
  schema: lessonSchema
};
