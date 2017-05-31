const Course = require('../models/course.model').model;
const config = require('../configs/config');
const utils = require('../utility/mongoose.util');

module.exports = function(apiRouter, passport) {
  apiRouter.route('/courses').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    Course.find({}, (err, courses) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          err: '404'
        });
      }
      res.json({
        success: true,
        data: courses
      });
    });
  });

  apiRouter.route('/courses').post(passport.authenticate('jwt', config.passport), (req, res, next) => {
    console.log(req.body);
    let body = {
      uTitle: req.body.title,
      title: req.body.title,
      subtitle: req.body.subtitle,
      overview: req.body.overview,
      abouts: req.body.abouts,
      author: req.body.author,
      icon: req.body.icon,
      new: true
    };

    console.log(body);
    let course = new Course(body);

    let handleResponse = function(error) {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200,
          data: course
        });
      }
    };

    course.save(handleResponse);
  });

  apiRouter.route('/courses/:id').delete(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let course = {
      _id: req.params.id
    };

    let handleResponse = function(error) {
      if (error) {
        console.log('_____________');
        console.log(error);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200
        });
      }
    };

    Course.remove(course, handleResponse);
  });

  apiRouter.route('/courses/update').post(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let updatedCourse = req.body;
    let id = updatedCourse._id;
    let updateCourse = function(error, course) {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          error: 500
        });
      } else {
        let handleResponse = function(err) {
          if (err) {
            res.json({
              success: false,
              error: 500
            });
          } else {
            res.json({
              success: true,
              error: 200
            });
          }
        };
        // FIXME: Update course not overide it!
        utils.updateDocument(course, Course, updatedCourse);
        course.save(handleResponse);
      }
    };

    Course.findById(id, updateCourse);

  });

  apiRouter.route('/courses/up').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let query = {
      status: 2
    };
    Course.find(query, (err, courses) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          err: '404'
        });
      }
      res.json({
        success: true,
        data: courses
      });
    });
  });

  apiRouter.route('/courses/admin').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let query = {
      status: {
        $in: [1, 2, 3]
      }
    };
    Course.find(query, (err, courses) => {
      // console.log(courses);
      if (err || !courses) {
        console.log(err);
        res.json({
          success: false,
          err: '404'
        });
      }
      res.json({
        success: true,
        data: courses
      });
    });
  });

  apiRouter.get('/courses/:courseUTitle', passport.authenticate('jwt', config.passport), (req, res, next) => {
    let courseUTitle = req.params.courseUTitle.toLowerCase();

    let query = {
      uTitle: courseUTitle
    };
    Course.findOne(query, function(err, course) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          error: `Err: ${err}`
        });
      } else if (!course) {
        res.json({
          success: false,
          error: '404'
        });
      } else {
        res.json({
          success: true,
          data: course
        });
      }
    });
  });

  apiRouter.post('/courses/send', passport.authenticate('jwt', config.passport), (req, res, next) => {
    let find = req.body;
    let update = {
      $set: {
        status: 1
      }
    };

    let handleResponse = function(err) {
      if (err) {
        console.log('err');
        console.error(err);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200
        });
      }
    };
    Course.update(find, update, handleResponse);
  });

  apiRouter.post('/courses/takeback', passport.authenticate('jwt', config.passport), (req, res, next) => {
    let find = req.body;
    let update = {
      $set: {
        status: 0
      }
    };

    let handleResponse = function(err) {
      if (err) {
        console.error(err);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200
        });
      }
    };
    Course.update(find, update, handleResponse);
  });

  apiRouter.post('/courses/accept', passport.authenticate('jwt', config.passport), (req, res, next) => {
    let find = req.body;
    let update = {
      $set: {
        status: 2
      }
    };

    let handleResponse = function(err) {
      if (err) {
        console.error(err);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200
        });
      }
    };
    Course.update(find, update, handleResponse);
  });
  apiRouter.post('/courses/reject', passport.authenticate('jwt', config.passport), (req, res, next) => {
    let find = req.body;
    let update = {
      $set: {
        status: 1
      }
    };

    let handleResponse = function(err) {
      if (err) {
        console.error(err);
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          message: 200
        });
      }
    };
    Course.update(find, update, handleResponse);
  });
};
