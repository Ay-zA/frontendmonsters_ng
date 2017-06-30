const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchemaObject = {
  title: {
    type: String
  },
  icon: {
    type: String
  },
  about: {
    type: String
  }
};

const achievementSchema = new Schema({
  title: {
    type: String
  },
  icon: {
    type: String
  },
  about: {
    type: String
  }
});

const model = mongoose.model('achievements', achievementSchema);

module.exports = {
  model,
  schema: achievementSchemaObject
};
