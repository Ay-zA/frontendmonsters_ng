import { Component, OnInit, Input } from '@angular/core';
import { Exercise, Lesson } from '../../../../../models';

@Component({
  selector: 'hg-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  @Input() exercise;

  constructor() { }

  ngOnInit() {
  }

  onHintClick(instruction) {
    instruction.isHintVisible = !instruction.isHintVisible;
  }

  isRight(instruction) {
    return (instruction.state === 1);
  }

  isWrong(instruction) {
    return (instruction.state === -1);
  }
}
