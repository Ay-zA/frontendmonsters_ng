import { Exercise } from './exercise.model';
import { Exam } from './exam.model';

interface ILesson {
  uTitle?: string;
  title?: string;
  exercises?: Exercise[];
  exams?: Exam[];
  donePercent?: number;
  $editMode?: boolean;
}

export class Lesson {
  public uTitle: string;
  public title: string;
  public exercises: Array<Exercise>;
  public exams: Array<Exam>;
  public donePercent: number;
  public time: number;
  public experience: number;

  public $editMode: boolean;

  public get isDone() {
    return this.donePercent === 100;
  }
  constructor(lesson: ILesson) {
    this.uTitle = lesson.uTitle || 'no_title';
    this.title = lesson.title || 'NO TITLE';
    this.exercises = !!lesson.exercises ? lesson.exercises.map(exercise => new Exercise(exercise)) : [];
    this.exams = lesson.exams || [];
    this.$editMode = lesson.$editMode || false;

    this.calculateDonePercent();
    this.calculateTimeAndXp();
  }

  calculateDonePercent() {
    if (!!this.exercises) {
      let doneExercises = this.exercises.filter((exercise) => exercise.isDone);
      this.donePercent = doneExercises.length / this.exercises.length * 100;
    }
  }

  calculateTimeAndXp() {
    let time = 0;
    let exp = 0;
    let reduceTimeAndXp = (prev, curr, currIndex, array): any => {
      let sumTime;
      let sumXp;

      if (prev.hasOwnProperty('time')) {
        sumTime = prev.time + curr.time;
      }

      if (prev.hasOwnProperty('experience')) {
        sumXp = prev.experience + curr.experience;
      }
      return { time: sumTime, experience: sumXp };
    };
    if (this.exercises.length > 0) {
      time += this.exercises.reduce(reduceTimeAndXp).time;
      exp += this.exercises.reduce(reduceTimeAndXp).experience;
    }
    if (this.exams.length > 0) {
      time += this.exams.reduce(reduceTimeAndXp).time;
    }

    this.time = time;
    this.experience = exp;
  }

  deleteNthExercise(index) {
    this.exercises.splice(index, 1);
    this.calculateTimeAndXp();
  }
}
