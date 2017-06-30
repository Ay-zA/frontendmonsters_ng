const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchemaObject = {
  technology: {
    type: String
  },
  description: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date()
  }
};

const requestSchema = new Schema({
  technology: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const model = mongoose.model('request', requestSchema);

module.exports = {
  model: model,
  schema: requestSchemaObject
};
