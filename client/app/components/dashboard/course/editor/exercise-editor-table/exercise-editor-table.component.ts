import { Component, OnInit, Input } from '@angular/core';
import { Exercise, Instruction } from '../../../../../models';

@Component({
  selector: 'hg-exercise-editor-table',
  templateUrl: './exercise-editor-table.component.html',
  styleUrls: ['./exercise-editor-table.component.scss']
})
export class ExerciseEditorTableComponent implements OnInit {

  @Input() exercise: Exercise;

  constructor() { }

  ngOnInit() {
  }

  onNewInstructionClick() {
    this.exercise.instructions.push(new Instruction({ $editMode: true }));
  }

  onDeleteInstruction(insIndex) {
    this.exercise.instructions.splice(insIndex, 1);
  }

  onEditInstruction(newInstruction, insIndex) {
    this.exercise.instructions[insIndex].instruction = newInstruction;
  }

  onEditHint(newHint, insIndex) {
    this.exercise.instructions[insIndex].hint = newHint;
  }

  onEditResult(newResult, insIndex) {
    this.exercise.instructions[insIndex].result = newResult;
  }
}
