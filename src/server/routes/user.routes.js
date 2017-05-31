const config = require('../configs/config');
const User = require('../models/user.model');
const Course = require('../models/course.model').model;
const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = function(apiRouter, passport) {
  apiRouter.route('/users/').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let sendResponse = function(err, data) {
      if (err) {
        res.json({
          success: false,
          error: err
        });
        return;
      }
      res.json({
        success: true,
        data: data
      });
    };

    User.find({}, sendResponse);
  });
  apiRouter.route('/users/:id/take').post(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let userId = req.params.id;
    let courseId = req.body.courseId;

    let course = {
      _id: courseId
    };

    let user = {
      _id: userId
    };

    let sendError = function(err) {
      res.json({
        success: false,
        error: err
      });
    };

    let sendResponse = function(data) {
      res.json({
        success: true,
        data: data
      });
    };

    let findUserAndPushCourse = function(course) {
      let pushCourse = {
        $push: {
          courses: course
        }
      };
      return User.findOneAndUpdate(user, pushCourse);
    };

    Course.findOne(course).then(findUserAndPushCourse, sendError).then(sendResponse, sendError);
  });
  apiRouter.route('/users/:id/done/exercise').post(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let userId = req.params.id;
    let {
      courseUTitle,
      lessonUTitle,
      exerciseIndex
    } = req.body;


    let sendError = function(err) {
      res.json({
        success: false,
        error: err
      });
    };

    let sendResponse = function(data) {
      res.json({
        success: true,
        data: data
      });
    };

    let doneExercise = function(err, user) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          error: err
        });
      } else {
        let courseIndex = user.courses.findIndex(course => course.uTitle === courseUTitle);

        if (courseIndex === -1) {
          console.log('Course not found');
          return;
        }

        let lessonIndex = user.courses[courseIndex].lessons.findIndex(lesson => lesson.uTitle === lessonUTitle);
        if (lessonIndex === -1) {
          console.log('Lesson not found');
          return;
        }
        let exp = user.courses[courseIndex].lessons[lessonIndex].exercises[exerciseIndex].experience;
        user.courses[courseIndex].lessons[lessonIndex].exercises[exerciseIndex].instructions.every((instruction) => instruction.state = 1);
        user.courses[courseIndex].lessons[lessonIndex].exercises[exerciseIndex].gainedExp = exp;
        user.experience += exp;
        user.save((err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          res.json({
            success: true,
            message: 'Successfuly updated',
            user: user
          });
        });
      }
    };

    User.findById(userId, doneExercise);

  });
  apiRouter.route('/users/:id/courses').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let userId = req.params.id;

    let user = {
      _id: userId
    };


    let sendCourses = function(err, data) {
      if (err || !data || typeof data.courses === 'undefined') {
        res.json({
          success: false,
          error: err
        });
      } else {
        let courses = data.courses;
        res.json({
          success: true,
          data: courses
        });
      }
    };

    User.findOne(user, sendCourses);

  });
  apiRouter.route('/users/:id/courses/:courseUTitle').get(passport.authenticate('jwt', config.passport), (req, res, next) => {

    let userId = req.params.id;
    let courseUTitle = req.params.courseUTitle.toLowerCase();

    let user = {
      _id: userId
    };


    let sendCourses = function(err, data) {
      if (err || !data || typeof data.courses === 'undefined') {
        res.json({
          success: false,
          error: err
        });
      } else {
        let courseIndex = data.courses.findIndex(course => course.uTitle === courseUTitle);
        let course = data.courses[courseIndex];
        if (!course) {
          res.json({
            success: false,
            error: 'You don\'t have this course'
          });
        } else {
          res.json({
            success: true,
            data: course
          });
        }
      }
    };

    User.findOne(user, sendCourses);

  });
  apiRouter.route('/users/:id/mycourses').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let userId = req.params.id;

    let courses = {
      author: userId
    };


    let sendCourses = function(err, data) {
      if (err || !data) {
        res.json({
          success: false,
          error: err
        });
      } else {
        let courses = data.courses;
        res.json({
          success: true,
          data: data
        });
      }
    };

    Course.find(courses, sendCourses);

  });
};
