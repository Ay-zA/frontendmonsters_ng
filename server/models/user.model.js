const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
  achievements: [
    {
      type: ObjectId,
      ref: 'achievements'
    }
  ],
  licenses: [licenseSchema]
});

userSchema.methods.comparePassword = function(pw) {
  let user = this;

  bcrypt
    .compare(pw, user.password)
    .then( isMatch => {
      return new Promise( (resolve) => {
        resolve(isMatch);
      });
    })
    .catch(e => {
      throw new Error(e);
    });
};

userSchema.methods.getUserInfo = function() {
  let userCourseTitles = this.courses.map(course => course.title);
  let user = {
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

userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password') && !user.isNew) {
    return next();
  }

  let hashPassword = function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    }).catch(e => next(e));
  };

  bcrypt.genSalt(10, hashPassword);
});

module.exports = mongoose.model('users', userSchema);
