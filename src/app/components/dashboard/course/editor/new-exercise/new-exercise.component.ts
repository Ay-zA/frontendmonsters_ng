import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hg-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  @Input() exercise;
  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.save.emit(null);
  }

}
