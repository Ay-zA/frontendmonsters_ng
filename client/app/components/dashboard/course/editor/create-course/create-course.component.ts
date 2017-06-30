import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Course } from '../../../../../models';

@Component({
  selector: 'hg-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  course = new Course({});

  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCancel() {
    this.cancel.emit(null);
  }

  onSubmit() {
    console.log(this.course);
    this.submit.emit(this.course);
  }
}
