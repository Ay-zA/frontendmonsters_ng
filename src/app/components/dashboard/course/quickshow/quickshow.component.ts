import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../../services';
import { Course } from '../../../../models';

@Component({
  selector: 'hg-course-quickshow',
  templateUrl: './quickshow.component.html',
  styleUrls: ['./quickshow.component.scss']
})
export class CourseQuickshowComponent implements OnInit {
  @Output() feedback = new EventEmitter();
  @Input() course: Course;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  onClose() {
    this.feedback.emit(null);
  }

  onTake() {
    this.feedback.emit(this.course);
  }
}
