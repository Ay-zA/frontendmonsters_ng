import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService, UserService } from '../../../../../services';
import { User, PanelButton, Course } from '../../../../../models';

@Component({
  selector: 'hg-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() user: User;

  courses: Array<PanelButton> = [
    new PanelButton({ icon: 'fa fa-html5', title: 'Static', subtitle: 'Here some static course.' }),
  ];
  addCourse = new PanelButton({ subtitle: 'Just click me to lean somthing new', icon: 'fontello icon-plus' });

  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.courses = this.route.snapshot.data['courses'];
  }

  onSelectCourse(course) {
    this.router.navigate(['/dashboard/courses/', course.uTitle]);
  }

  onAddCourseClicked() {
    this.router.navigate(['/dashboard/academy']);
  }

}
