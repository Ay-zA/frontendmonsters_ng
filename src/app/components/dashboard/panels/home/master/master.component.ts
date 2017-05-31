import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Course, PanelButton, INotification, NotificationType } from '../../../../../models';
import { CourseService, NotificationService } from '../../../../../services';

@Component({
  selector: 'hg-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  @Input() user: User;
  courses: Course[];
  createCoursePanel: boolean;

  createCourse = new PanelButton({ icon: 'fontello icon-plus', subtitle: 'New Course' });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.courses = this.route.snapshot.data['courses'];
  }

  onSelectCourse(course) {
    console.log(course);
    this.router.navigate(['dashboard/courses/editor', course.uTitle]);
  }

  onCreateCourseClicked() {
    this.createCoursePanel = true;
  }

  closeCreateCoursePanel() {
    this.createCoursePanel = false;
  }

  onCreateNewCourse(course: Course) {
    this.createCoursePanel = false;
    course.author = this.user._id;

    this.courseService.createCourse(course).subscribe((res) => {
      let saveNotification: INotification;

      if (res.success) {
        this.courses.push(res.data);
        saveNotification = {
          title: 'Success',
          message: `${course.title} has successfully created.`,
          type: NotificationType.Success
        };
      } else {
        saveNotification = {
          title: 'Error',
          message: 'Title and Subtitle are required.',
          type: NotificationType.Error
        };
      }
      this.notificationService.notif(saveNotification);
    });
    // console.warn(course);
  }
}
