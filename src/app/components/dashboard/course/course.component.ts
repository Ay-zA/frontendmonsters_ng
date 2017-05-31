import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CourseService, UserService } from '../../../services';
import { Course, Lesson, Exercise, Panel, Roles } from '../../../models';

@Component({
  selector: 'hg-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  currentLesson: Lesson;
  lessonUTitle: string;
  currentExerciseIndex = -1;
  currentLessonIndex = -1;
  course: Course;
  lessonPanels: Panel[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private courseService: CourseService) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.lessonUTitle = this.route.snapshot.params['lessonUTitle'];

    let action = this.route.snapshot.queryParams['action'];

    if (!this.course) {
      console.log('Course not retrieved');
      return;
    }

    this.findNextLesson();
    this.findNextExercise();

    console.log(this.currentLesson);

    if (this.lessonUTitle || action === 'resume') {
      this.resume();
    }


    if (this.currentExerciseIndex === -1) {
      // COMPELETED COURSE
    }
    this.initLessonPanels();

  }

  retrieveLesson() {
    if (this.currentLessonIndex !== -1) {
      return;
    }

    if (this.lessonUTitle) {
      this.retriveFromUrl();
    } else {
      this.findNextLesson();
    }
  }

  retriveFromUrl() {
    this.currentLesson = this.course.getLessonByUTitle(this.lessonUTitle);

    if (!this.currentLesson) {
      console.warn('[CourseComponent]: Lesson Not Retrived');
      return;
    }

    this.currentLessonIndex = this.course.lessons.findIndex(lesson => lesson.uTitle === this.currentLesson.uTitle);
  }

  findNextLesson() {
    this.currentLessonIndex = this.findNextIndexIn(this.course.lessons);
    if (this.currentLessonIndex === -1) {
      console.warn('[CourseComponent]: All lessons compeleted');
      return;
    }
    this.currentLesson = this.course.lessons[this.currentLessonIndex];
  }

  findNextExercise() {
    if (this.currentExerciseIndex !== -1) {
      return;
    }

    if (!this.currentLesson) {
      return;
    }

    this.currentExerciseIndex = this.findNextIndexIn(this.currentLesson.exercises);
  }

  findNextIndexIn(collection) {
    for (let i = 0; i < collection.length; i++) {
      let exercise: Exercise | Lesson = collection[i];
      if (exercise.isDone) {
        continue;
      }
      return i;
    }
    return -1;
  }

  resume() {
    if (!this.currentLesson) {
      // TODO: Course is compeleted
      return;
    }

    this.gotoExercise(this.currentLesson.uTitle, this.currentExerciseIndex);
  }

  initLessonPanels() {
    for (let i = 0; i < this.course.lessons.length; i++) {
      this.lessonPanels.push(new Panel({ isExpanded: true }));
    }
  }

  isExpanded(index) {
    return this.lessonPanels[index].isExpanded;
  }

  togglePanel(index) {
    this.lessonPanels[index].toggleExpand();
  }

  notReached(lessonIndex, exerciseIndex) {
    if (this.userService.currentUser.role !== Roles.Student) {
      return false;
    }

    if (lessonIndex === this.currentLessonIndex) {
      return exerciseIndex > this.currentExerciseIndex;
    }
    return lessonIndex > this.currentLessonIndex;
  }

  letsLearn(lessonIndex, exerciseIndex) {
    let selectedLessonTitle = this.course.lessons[lessonIndex].uTitle;
    this.gotoExercise(selectedLessonTitle, exerciseIndex);
  }

  gotoExercise(lessonUTitle, exerciseIndex) {
    let route = `/dashboard/courses/${this.course.uTitle}/${lessonUTitle}/${exerciseIndex}`;
    this.router.navigate([route]);
  }
}
