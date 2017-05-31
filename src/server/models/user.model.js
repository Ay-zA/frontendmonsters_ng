const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const courseSchema = require('./course.model').schema;
const licenseSchema = require('./license').schema;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  courses: [courseSchema],
  experience: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 0
  },
  role: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: Number,
    default: 0
  },
  achievements: [{
    type: ObjectId,
    ref: 'achievements'
  }],
  licenses: [licenseSchema]
});

userSchema.methods.comparePassword = function(pw, cb) {
  let user = this;
  let handleComparePassword = function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  };
  bcrypt.compare(pw, user.password, handleComparePassword);
};

userSchema.methods.getUserInfo = function() {
  let userCourseTitles = this.courses.map(course => course.title);
  var user = {
    _id: this._id,
    email: this.email,
    name: this.name,
    experience: this.experience,
    courseTitles: userCourseTitles,
    level: this.level,
    achievements: this.achievements,
    licenses: this.licenses,
    role: this.role
  };
  return user;
};

var handleSaveNewUser = function(next) {
  let user = this;
  if (!user.isModified('password') && !user.isNew) {
    return next();
  }

  let saveHashedPassword = function(err, hashedPassword) {
    if (err) {
      return next(err);
    }
    user.password = hashedPassword;
    next();
  };

  let hashPassword = function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, saveHashedPassword);
  };

  bcrypt.genSalt(10, hashPassword);
};

userSchema.pre('save', handleSaveNewUser);
module.exports = mongoose.model('users', userSchema);
