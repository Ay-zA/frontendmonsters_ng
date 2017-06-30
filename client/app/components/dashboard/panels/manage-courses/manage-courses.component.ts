import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course, CourseStatus, Panel, User, Roles, INotification, NotificationType } from '../../../../models';
import { CourseService, NotificationService } from '../../../../services';

@Component({
  selector: 'hg-panel-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss']
})
export class PanelManageCoursesComponent implements OnInit {
  courses: Course[];
  courseAndPanels = [];
  user: User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courses = this.route.snapshot.data['allCourses'];
    this.user = this.route.snapshot.data['user'];

    if (!this.courses || !this.user) {
      console.warn('[ManageCourse]: Data not resolved');
    }
    console.log(this.courses);
    this.initCourses();
  }

  initCourses() {
    this.courseAndPanels[CourseStatus.Down] = { courses: [], panel: new Panel({ name: 'Down Courses' }) };
    this.courseAndPanels[CourseStatus.Pending] = { courses: [], panel: new Panel({ name: 'Pending Courses' }) };
    this.courseAndPanels[CourseStatus.Up] = { courses: [], panel: new Panel({ name: 'Accepted Courses' }) };
    this.courseAndPanels[CourseStatus.Archived] = { courses: [], panel: new Panel({ name: 'Archived Course', isExpanded: false }) };
    this.courseAndPanels.push({ courses: [], panel: new Panel({ name: 'All Courses' }) });

    if (!this.user.settings['manageCourseView']) {
      this.initDefaultView();
    }
  }

  showInGroup() {
    for (let course of this.courses) {
      if (!!this.courseAndPanels[course.status]) {
        this.courseAndPanels[course.status].courses.push(course);
      }
    }
  }

  showAll() {
    let last = this.courseAndPanels.length - 1;
    for (let course of this.courses) {
      this.courseAndPanels[last].courses.push(course);
    }
  }

  initDefaultView() {
    switch (this.user.role) {
      case Roles.Admin:
        this.showInGroup();
        break;
      case Roles.Master:
        this.showAll();
        break;
      default:
        alert('What the fuck are you doing here?');
    }
  }

  onAcceptCourse(course) {
    this.courseService.accept(course._id).subscribe(res => {
      if (res.success) {
        let notification = {
          title: 'Accepted',
          message: `The ${course.title} course now accessible for all students.`,
          type: NotificationType.Success
        };
        this.notificationService.notif(notification);

        course.status = CourseStatus.Up;
        let index = this.courseAndPanels[CourseStatus.Pending].courses.indexOf(course);
        this.courseAndPanels[CourseStatus.Pending].courses.splice(index, 1);
        this.courseAndPanels[CourseStatus.Up].courses.push(course);
      }
    });
  }

  onRejectCourse(course) {
    this.courseService.reject(course._id).subscribe(res => {
      if (res.success) {
        let notification = {
          title: 'Rejected',
          message: `The ${course.title} course has been rejected.`,
          type: NotificationType.Success
        };
        this.notificationService.notif(notification);
        course.status = CourseStatus.Pending;
        let index = this.courseAndPanels[CourseStatus.Up].courses.indexOf(course);
        this.courseAndPanels[CourseStatus.Up].courses.splice(index, 1);
        this.courseAndPanels[CourseStatus.Pending].courses.push(course);
      }
    });
  }

  onDeleteCourse(course) {
    this.courseService.deleteCourse(course._id).subscribe(res => {
      if (res.success) {
        let index = this.courses.indexOf(course);
        this.courses.splice(index, 1);

        let notification = {
          title: 'Deleted!',
          message: `${course.title} course has been deleted successfully`,
          type: NotificationType.Warning
        };
        this.notificationService.notif(notification);
      }
    });
  }
}
