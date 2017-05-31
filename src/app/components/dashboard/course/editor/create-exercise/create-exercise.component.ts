import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'hg-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  form: FormGroup;
  @Input() exercise;
  @Output() save = new EventEmitter();
  @Output() revert = new EventEmitter();

  hoverCancelBtn: boolean;
  hoverSaveBtn: boolean;

  showCancelBtn: boolean;
  showSaveBtn: boolean;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      learn: ['', Validators.required],
    });

    // console.log(this.form.controls);
  }

  isExercise() {
    console.log(this.exercise);
    return typeof (this.exercise) !== 'undefined';
  }

  onSave() {
    this.save.emit();
  }
  openSaveButton() {
    this.hoverSaveBtn = true;
    setTimeout(() => {
      if (this.hoverSaveBtn) {
        this.showSaveBtn = true;
      }
    }, 200);
  }

  closeSaveButton() {
    this.hoverSaveBtn = false;
    this.showSaveBtn = false;
  }

  onCancel() {
    this.revert.emit();
  }

  openCancel() {
    this.hoverCancelBtn = true;
    setTimeout(() => {
      if (this.hoverCancelBtn) {
        this.showCancelBtn = true;
      }
    }, 200);
  }

  closeCancelButton() {
    this.hoverCancelBtn = false;
    this.showCancelBtn = false;
  }


}
