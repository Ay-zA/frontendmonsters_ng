const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var License = function({
  title,
  icon,
  about
}) {
  this.title = title;
  this.icon = icon;
  this.about = about;
};

const licenseSchema = {
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

module.exports = {
  model: License,
  schema: licenseSchema
};
