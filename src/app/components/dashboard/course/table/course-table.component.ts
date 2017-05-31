import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Course, CourseStatus, Panel } from '../../../../models';

@Component({
  selector: 'hg-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit {

  @Input() courses: Course[];
  @Input() panel: Panel;
  @Input() user;
  @Input() status: boolean;
  @Output() accept = new EventEmitter();
  @Output() reject = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  editCourse(uTitle) {
    this.router.navigate([`dashboard/courses/editor/${uTitle}`]);
  }

  acceptCourse(course) {
    this.accept.emit(course);
  }

  rejectCourse(course) {
    this.reject.emit(course);
  }

  onDeleteCourse(course) {
    if (course.status !== 2) {
      this.delete.emit(course);
    }
  }

}
