import { Component, OnInit } from '@angular/core';
import { Exercise, Course } from '../../../../models';
import { UserService, CourseService } from '../../../../services';

@Component({
  selector: 'hg-panel-test',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.scss']
})
export class PanelTestComponent implements OnInit {
  exercise: Exercise;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourseByUTitle('js').subscribe((course: Course) => {
      this.exercise = course.lessons[0].exercises[0];
      console.log(this.exercise);
    });
  }

}
