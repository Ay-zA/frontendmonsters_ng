import { Component, OnInit, Input } from '@angular/core';
import { PanelButton } from '../../../../models';

@Component({
  selector: 'hg-course-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class CourseButtonComponent implements OnInit {
  @Input() course: PanelButton;
  @Input() progressBar: boolean;
  @Input() infoPanel: boolean;
  @Input() status: boolean;

  constructor() { }

  ngOnInit() {

  }
}
