/* eslint-disable no-shadow, no-use-before-define */
const User = require('../models/user.model');
const Course = require('../models/course.model').model;
const Lesson = require('../models/lesson').model;
const Exercise = require('../models/exercise').model;
// const Exam = require('../models/exam').model;
const Achievement = require('../models/achievement.model').model;
const Request = require('../models/request.model').model;

function title2UTitle(title) {
  return title
    .replace(/\s+/g, '_')
    .toLowerCase();
}

let generateRequest = function(technology, description, user, status) {
  let request = new Request({
    technology,
    description,
    email: user.email,
    status,
    date: new Date()
  });

  request
    .save()
    .then(newTech => { console.log('  -' + newTech.technology); })
    .catch(console.error);

  return request;
};

let generateUser = function(username, role, level, ...courses) {
  let user = new User({
    name: username,
    password: 'hg',
    email: `${username}@hg.com`,
    courses,
    level,
    experience: 0,
    status: Math.round(Math.random()),
    role
  });

  user
    .save()
    .then(newUser => { console.log('  -' + newUser.email); })
    .catch(console.error);

  return user;
};

let generateAchievement = function(title, icon, about) {
  let achievement = new Achievement({
    title,
    icon,
    about
  });

  achievement
    .save()
    .then(newAch => { console.log('  -' + newAch.title); })
    .catch(console.error);

  return achievement;
};

let generateCourse = function(title, icon, author, status, editor) {
  let course = new Course({
    uTitle: title2UTitle(title),
    title,
    icon,
    subtitle: `Learn the fundamentals of ${title}.`,
    overview: 'Here is some course overview you can read and choose what course you need.',
    abouts: [{
      title: 'Course Outcomes',
      about: `By the end of this course, you'll learn the basics of ${title} and how to structure and style your webpage.`
    }, {
      title: `Why learn ${title}?`,
      about: `Everything you see in a website is a result of the combination of ${title}. With these languages, you will have the skills you need to bring your website design to life.`
    }],
    author: author._id,
    lessons: [],
    status,
    license: {
      title,
      icon,
      about: 'This is HTML5 License'
    },
    new: false,
    editor
  });

  let lessonCount = Math.ceil(Math.random() * 3) + 1;
  for (let i = 0; i < lessonCount; i++) {
    let lessonTitle = `${title} Lesson ${i}`;
    let lesson = generateLesson(lessonTitle);
    course.lessons.push(lesson);
  }

  course
    .save()
    .then(newCourse => { console.log('  -' + newCourse.title); })
    .catch(console.error);

  return course;
};

function generateLesson(title) {
  let lesson = new Lesson({
    uTitle: title2UTitle(title),
    title,
    exercises: [],
    exams: []
  });

  let exerciseCount = Math.ceil(Math.random() * 5) + 1;
  for (let exerciseIndex = 0; exerciseIndex < exerciseCount; exerciseIndex++) {
    let exercise = generateExercise(title, exerciseIndex);
    lesson.exercises.push(exercise);
  }

  return lesson;
}

function generateExercise(title, index) {
  let exercise = new Exercise({
    title: `${title} Exercise ${index}`,
    learn: `Welcome to this exercise,
    in this part you'll learn something about html.`,
    time: Math.ceil(Math.random() * 5) * 5 + 5,
    experience: Math.ceil(Math.random() * 3) * 5 + 10,
    instructions: []
  });
  let instructionCount = Math.ceil(Math.random() * 5) + 1;

  for (let instructionIndex = 0; instructionIndex < instructionCount; instructionIndex++) {
    let instruction = generateInstruction(instructionIndex);
    exercise.instructions.push(instruction);
  }

  return exercise;
}

function generateInstruction(index) {
  let instruction = {
    instruction: `Here is instructions ${index}`,
    hint: 'Here is Hint 1',
    result: 'undefined'
  };

  return instruction;
}

module.exports = {
  generateUser,
  generateCourse,
  generateRequest,
  generateAchievement
};
