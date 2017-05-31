const mongoose = require('mongoose');
const User = require('../models/user.model');
const Course = require('../models/course.model').model;
const Request = require('../models/request.model').model;
const mockGenerator = require('./mockGenerator');

let handleError = function(error) {
  if (error) {
    console.error(error);
  }
};

module.exports = function() {

  User.remove({}, handleError);
  Course.remove({}, handleError);
  Request.remove({}, handleError);

  let admin = mockGenerator.generateUser('admin', 2, 12);
  let master = mockGenerator.generateUser('master', 1, 2);
  let master2 = mockGenerator.generateUser('master2', 1, 2);

  let html = mockGenerator.generateCourse('HTML', 'devicons devicons-html5', master, 2, 'html');
  mockGenerator.generateCourse('CSS', 'devicons devicons-css3', master, 2, 'css');
  mockGenerator.generateCourse('JS', 'devicons devicons-javascript', master, 1, 'js');
  mockGenerator.generateCourse('Ruby', 'devicons devicons-ruby', master2, 2, 'ruby');
  mockGenerator.generateCourse('Angular', 'devicons devicons-angular', master2, 1, 'js');
  mockGenerator.generateCourse('Java', 'devicons devicons-java', master, 0, 'java');
  mockGenerator.generateCourse('PHP', 'devicons devicons-php', master, 0, 'php');
  mockGenerator.generateCourse('Node Js', 'devicons devicons-java', master2, 1, 'js');
  mockGenerator.generateCourse('Python', 'devicons devicons-python', master2, 2, 'python');
  mockGenerator.generateCourse('MongoDb', 'devicons devicons-mongodb', master2, 1,'js');
  mockGenerator.generateCourse('SQL', 'devicons devicons-database', master, 2, 'sql');
  mockGenerator.generateCourse('Android', 'devicons devicons-android', master, 2, 'java');

  let student = mockGenerator.generateUser('student', 0, 5, html);
  let student2 = mockGenerator.generateUser('student2', 0, 2);
  let student3 = mockGenerator.generateUser('student3', 0, 3);
  let student4 = mockGenerator.generateUser('student4', 0, 4);
  let student5 = mockGenerator.generateUser('student5', 0, 5);
  let student6 = mockGenerator.generateUser('student6', 0, 6);

  let request = mockGenerator.generateRequest('PHP', 'description', student, 1);
  let request2 = mockGenerator.generateRequest('Angular', 'description', student2, 0);
  let request3 = mockGenerator.generateRequest('Fake', '', student3, 0);
};
