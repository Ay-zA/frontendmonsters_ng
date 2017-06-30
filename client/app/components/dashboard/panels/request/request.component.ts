import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Request } from '../../../../models';

@Component({
  selector: 'hg-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  request = new Request({status: 0});
  @Output() submit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit(this.request);
  }

  onCancel() {
    this.cancel.emit(null);
  }
}
