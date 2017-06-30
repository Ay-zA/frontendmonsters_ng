import { Component, OnInit, ViewChild } from '@angular/core';
import { Lesson, Exercise } from '../../../../models';
import { CourseService } from '../../../../services';

@Component({
  selector: 'hg-panel-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {
  ngOnInit() { }
}
