import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hg-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  @Input() maxValue;
  @Input() value;

  constructor() { }

  ngOnInit() {
  }

  calcPercent() {
    if (!this.maxValue) {
      return '0%';
    }
    return (this.value / this.maxValue * 100).toString() + '%';
  }
}
