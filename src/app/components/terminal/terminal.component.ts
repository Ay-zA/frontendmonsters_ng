import { Component, OnInit, Input } from '@angular/core';
import { NotificationType } from '../../models';
@Component({
  selector: 'hg-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @Input() output = '';
  @Input() type = NotificationType.Warning;

  constructor() { }

  ngOnInit() {
  }

}
