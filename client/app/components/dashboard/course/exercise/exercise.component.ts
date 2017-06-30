import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, Lesson, Panel, Exercise, NotificationType } from '../../../../models';
import { UserService, CourseService } from '../../../../services';

@Component({
  selector: 'hg-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor;
  course: Course;
  lesson: Lesson;
  exercise: Exercise;
  outputType = NotificationType.Warning;
  output: string;
  text: string;
  count: number;

  learnPanel = new Panel({ name: 'learn', isExpanded: false });
  editorPanel = new Panel({ name: 'editor', isExpanded: false });
  terminalPanel = new Panel({ name: 'terminal', isExpanded: false });

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    let lessonUTitle = this.route.snapshot.params['lessonUTitle'];
    let exerciseIndex = this.route.snapshot.params['exerciseIndex'];

    this.course = this.route.snapshot.data['course'];
    this.lesson = this.course.getLessonByUTitle(lessonUTitle);
    this.exercise = this.lesson.exercises[exerciseIndex];
    this.text = this.exercise.preCode;
  }

  ngAfterViewInit() {
    setTimeout(() => { this.openPanel(this.learnPanel); }, 1000);
    // this.editor.getEditor().setOptions({
    // });
    //
    // this.editor.getEditor().commands.addCommand({
    //   name: "showOtherCompletions",
    //   bindKey: "Ctrl-.",
    //   exec: function(editor) {
    //     console.log('Ctrl-. Clicked');
    //   }
    // })
  }

  openPanel(panel) {
    panel.isExpanded = true;

    // FIXME : AceEditor Resize Issue
    if (panel.name === 'editor') {
      setTimeout(() => {
        // this.editor.getEditor().content.innerText = "Somthing";
      }, 500);
    }
  }

  checkExercise() {
    this.terminalPanel.isExpanded = true;
    try {
      for (let instruction of this.exercise.instructions) {
        // let result = this.checkInstruction(JSON.parse(instruction.result));
        instruction.state = 1;
        this.output = '';
      }
      // this.output =
    } catch (e) {
      console.error(e);
      this.output = 'Oops! try again';
      this.outputType = NotificationType.Error;
    }
    console.log(this.output);

    // if (this.count >= this.exercise.instructions.length)
    //   return;
    // this.exercise.instructions[this.count++].state = 1;
    // for (let i = this.count; i < this.exercise.instructions.length; i++) {
    //   this.exercise.instructions[i].state = -1;
    // }
  }

  checkInstruction(result) {
    // let code = this.editor.oldText.trim();
    // this.outputType = NotificationType.Warning;
    // console.log(result);
    //
    // code = `(${code})(`;
    // if (result.inputs) {
    //   code += result.inputs[0];
    //   for (let i = 1; i < result.inputs.length; i++) {
    //     code += ',' + result.inputs[i];
    //   }
    // }
    // code += ')';
    // console.log(code);
    // let output = eval(code);
    // console.log(output);
    // console.log(result.output);
    if ('' === result.output) {
      return { output: '', state: 1 };
    } else {
      return { output: '', state: 1 };
    }
  }

  onLearnClicked() {
    this.openPanel(this.editorPanel);
    this.exercise.showInstructions = true;
  }

  onCompelete() {
    let exerciseIndex = this.route.snapshot.params['exerciseIndex'];

    this.userService.exerciseCompeleted(this.course, this.lesson, exerciseIndex).subscribe((data) => {
      console.warn('comp');
      console.log(data);
      this.router.navigate(['../'], { relativeTo: this.route });
    },
      err => { console.error(err); }
    );
  }
}
