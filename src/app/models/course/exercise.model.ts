import { Instruction } from './instruction.model';

interface IExercise {
  title?: string;
  learn?: string;
  instructions?: Instruction[];
  isDone?: boolean;
  gainedExp?: number;
  experience?: number;
  time?: number;
  preCode?: string;
  main?: string;
}

export class Exercise {

  public title: string;
  public learn: string;
  public instructions: Instruction[];
  public time: number;
  public experience: number;
  public gainedExp: number;
  public showInstructions: boolean;
  public preCode: string;
  public main: string;

  get isDone() {
    return this.instructions.every((ins) => ins.state === 1);
  }

  constructor(exercise: IExercise) {
    this.title = exercise.title || '';
    this.learn = exercise.learn || '';
    this.instructions = !!exercise.instructions ? exercise.instructions.map(instruction => new Instruction(instruction)) : [];
    this.experience = exercise.experience || 0;
    this.gainedExp = exercise.gainedExp || 0;
    this.showInstructions = false;
    this.time = exercise.time;
    this.preCode = exercise.preCode || '';
    this.main = exercise.main || '';
  }
}
