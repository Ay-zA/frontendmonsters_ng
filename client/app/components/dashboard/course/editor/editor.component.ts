import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Lesson, Exercise, INotification, NotificationType } from '../../../../models';
import { CourseService, NotificationService } from '../../../../services';
@Component({
  selector: 'hg-course-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class CourseEditorComponent implements OnInit {

  course: Course;
  currentExercise: Exercise;
  editExercise: Exercise;
  tmpExercise: Exercise;
  exerciseLessonIndex;
  exerciseIndex;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    if (!this.course) {
      // TODO: Handle error
      console.warn('[Editor]: Course not found');
    }
    console.log(this.course);
  }


  onNewExerciseClick(lessonIndex) {
    this.currentExercise = new Exercise({});
    this.exerciseLessonIndex = lessonIndex;
  }

  onNewLessonClick() {
    this.course.lessons.push(new Lesson({ title: '', $editMode: true }));
  }

  closeCreateExercisePanel(e) {
  }

  onExerciseSaved() {
    this.exerciseIndex = this.course.lessons[this.exerciseLessonIndex].exercises.length;
    this.course.lessons[this.exerciseLessonIndex].exercises.push(this.currentExercise);
    this.editExercise = this.currentExercise;
    this.currentExercise = null;
  }

  onExerciseEditorSaved() {
    this.editExercise = null;
    this.onSave();
  }

  onExerciseEditorCanceled() {
    console.log(this.course.lessons[this.exerciseLessonIndex].exercises[this.exerciseIndex]);
    this.course.lessons[this.exerciseLessonIndex].exercises[this.exerciseIndex] = this.tmpExercise;
    this.editExercise = null;
  }

  onSelectExercise(e) {
    this.exerciseIndex = e.index;
    this.exerciseLessonIndex = e.lessonIndex;
    this.editExercise = e.exercise;
    this.tmpExercise = new Exercise(e.exercise);
  }

  onSave() {
    this.courseService.updateCourse(this.course).subscribe(res => {
      let saveNotification = {
        title: 'Saved',
        message: 'Your change has successfully updated.',
        type: NotificationType.Success
      };
      this.notificationService.notif(saveNotification);
    });
  }

  onSend() {
    this.courseService.sendCourse(this.course._id).subscribe(res => {
      if (res.success) {
        this.course.status = 1;
        let notification = {
          title: 'Sent',
          message: `Your course has successfully sent to admin.`,
          type: NotificationType.Success
        };

        this.notificationService.notif(notification);
      }
    });
  }

  onTakeback() {
    this.courseService.takeback(this.course._id).subscribe(res => {
      if (res.success) {
        this.course.status = 0;
        let notification = {
          title: 'Takeback',
          message: `This course has been takebacked,
          you can edti and send it again.`,
          type: NotificationType.Success
        };

        this.notificationService.notif(notification);
      }
    });
  }

  closeNewExercise() {
    this.currentExercise = null;
  }

  onCourseDeleted() {
    this.courseService.deleteCourse(this.course._id).subscribe(res => {
      console.log(res);
      if (res.success) {
        let notification = {
          title: 'Deleted!',
          message: `${this.course.title} course has been deleted successfully`,
          type: NotificationType.Warning
        };

        this.notificationService.notif(notification);
        this.router.navigate(['/dashboard/home']);
      }
    });
  }
}
