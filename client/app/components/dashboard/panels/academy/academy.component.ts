import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course, PanelButton, INotification, NotificationType } from '../../../../models';
import { UserService, CourseService, RequestService, NotificationService } from '../../../../services';

@Component({
  selector: 'hg-panel-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class PanelAcademyComponent implements OnInit {
  courses: Course[];
  selectedCourse: Course;
  request: boolean;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private requestService: RequestService) { }

  ngOnInit() {
    this.courses = this.route.snapshot.data['courses'];
  }

  onSelectCourse(selectedCourse) {
    if (this.userService.currentUser.role !== 0 || this.userService.haveCourse(selectedCourse)) {
      this.router.navigate(['/dashboard/courses/', selectedCourse.uTitle]);
    } else {
      this.selectedCourse = selectedCourse;
    }
  }

  onCourseDetailFeedback(course) {
    if (!!course) {
      if (!this.userService.haveCourse(course)) {
        this.userService.takeCourse(course).subscribe(res => {
          this.router.navigate(['/dashboard/courses/', course.uTitle]);

          let notification = {
            title: 'Take Course',
            message: `${course.title} course has successfully added to you courses.`,
            type: NotificationType.Success
          };
          this.notificationService.notif(notification);
        });
      } else {
        this.router.navigate(['/dashboard/courses/', course.uTitle]);
      }
    }
    this.selectedCourse = null;
  }

  onRequestClick(request) {
    this.request = true;
  }

  onRequest(request) {
    this.request = false;
    this.userService.makeRequest(request).subscribe(
      res => {
        let notification = {
          title: 'Sent',
          message: `Your request has successfully sent to admin.`,
          type: NotificationType.Success
        };
        this.notificationService.notif(notification);
      },
      error => {
        let notification = {
          title: 'Error!',
          message: `Technology name is required.`,
          type: NotificationType.Error
        };
        this.notificationService.notif(notification);
      }
    );
  }

  onCancel() {
    this.request = false;
  }
}
