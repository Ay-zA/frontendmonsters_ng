const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const lessonSchema = require('./lesson').schema;
const licenseSchema = require('./license').schema;

const courseSchemaObject = {
  uTitle: {
    type: String,
    lowercase: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  overview: {
    type: String
  },
  abouts: [{
    title: {
      type: String
    },
    about: {
      type: String
    }
  }],
  author: {
    type: ObjectId,
    ref: 'user'
  },
  lessons: [lessonSchema],
  icon: {
    type: String
  },
  status: {
    type: Number
  },
  new: {
    type: Boolean,
    default: true
  },
  license: licenseSchema,
  editor: {
    type: String
  }
};

const courseSchema = new Schema({
  uTitle: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  overview: {
    type: String
  },
  abouts: [{
    title: {
      type: String
    },
    about: {
      type: String
    }
  }],
  author: {
    type: ObjectId,
    ref: 'user'
  },
  lessons: [lessonSchema],
  license: licenseSchema,
  icon: {
    type: String
  },
  status: {
    type: Number
  },
  new: {
    type: Boolean,
    default: true
  },
  editor: {
    type: String
  }

});

let createUTitle = function(next) {
  this.uTitle = this.title.replace(/\s+/g, '_').toLowerCase();
  for (let lesson of this.lessons) {
    lesson.uTitle = lesson.title.replace(/\s+/g, '_').toLowerCase();
    console.log(lesson.uTitle);
  }
  next();
};

courseSchema.pre('save', createUTitle);

const model = mongoose.model('courses', courseSchema);

module.exports = {
  model: model,
  schema: courseSchemaObject
};
