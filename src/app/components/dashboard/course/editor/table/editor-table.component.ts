import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../../../models';

@Component({
  selector: 'hg-editor-table',
  templateUrl: './editor-table.component.html',
  styleUrls: ['./editor-table.component.scss']
})
export class EditorTableComponent implements OnInit {
  @Output() onNewLesson = new EventEmitter();
  @Output() onNewExercise = new EventEmitter();
  @Output() selectExercise = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() send = new EventEmitter();
  @Output() takeback = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() course: Course;

  btnStatus = [
    { name: 'Down', class: 'fa-edit', action: 'Send', actionClass: 'fa-send' },
    { name: 'Pending', class: 'fa-spinner', action: 'Take Back', actionClass: 'fa-chevron-down' },
    { name: 'Accepted', class: 'fa-check' }
  ];

  hoverSendBtn = false;
  hoverSaveBtn = false;
  hoverDeleteBtn = false;
  hoverStatus = false;

  showSendBtn = false;
  showSaveBtn = false;
  showDeleteBtn = false;
  showSatus = false;

  constructor() { }

  ngOnInit() {
  }

  onNewLessonClick() {
    this.onNewLesson.emit(null);
  }

  onNewExerciseClick(lessonIndex) {
    this.onNewExercise.emit(lessonIndex);
  }

  onSelectExercise(exercise, exercieIndex, lessonIndex) {
    this.selectExercise.emit({ exercise: exercise, index: exercieIndex, lessonIndex: lessonIndex });
  }

  saveCourse() {
    this.save.emit(null);
  }

  onLessonNameChanged(newTitle, lessonIndex) {
    this.course.lessons[lessonIndex].title = newTitle;
  }

  onExerciseNameChanged(newTitle, lessonIndex, exerciseIndex) {
    this.course.lessons[lessonIndex].exercises[exerciseIndex].title = newTitle;
  }

  openSaveButton() {
    this.hoverSaveBtn = true;
    setTimeout(() => {
      if (this.hoverSaveBtn) {
        this.showSaveBtn = true;
      }
    }, 200);
  }

  openSendButton() {
    this.hoverSendBtn = true;
    setTimeout(() => {
      if (this.hoverSendBtn) {
        this.showSendBtn = true;
      }
    }, 200);
  }

  openStatus() {
    this.hoverStatus = true;
    setTimeout(() => {
      if (this.hoverStatus) {
        this.showSatus = true;
      }
    }, 200);
  }

  openDeleteButton() {
    this.hoverDeleteBtn = true;
    setTimeout(() => {
      if (this.hoverDeleteBtn) {
        this.showDeleteBtn = true;
      }
    }, 200);
  }

  closeSendButton() {
    this.hoverSendBtn = false;
    this.showSendBtn = false;
  }

  closeSaveButton() {
    this.hoverSaveBtn = false;
    this.showSaveBtn = false;
  }

  closeDeleteButton() {
    this.hoverDeleteBtn = false;
    this.showDeleteBtn = false;
  }

  closeStatus() {
    this.hoverStatus = false;
    this.showSatus = false;
  }

  onAction() {
    switch (this.course.status) {
      case 0:
        this.sendCourse();
        break;
      case 1:
        this.takeBack();
        break;
    }
  }

  sendCourse() {
    this.send.emit();
  }

  takeBack() {
    this.takeback.emit();
  }

  onDeleteLesson(index) {
    this.course.deleteNthLesson(index);
  }

  onDeleteExercise(lessonIndex, exIndex) {
    this.course.lessons[lessonIndex].deleteNthExercise(exIndex);
  }

  onDelete() {
    this.delete.emit();
  }
}
