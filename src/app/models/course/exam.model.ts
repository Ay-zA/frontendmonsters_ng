import { Question } from './question.model';

interface IExam {
  title: string;
  questions?: Question[];
  isDone?: boolean;
  point?: number;
  time?: number;
}

export class Exam {
  public title: string;
  public questions: Question[];
  public isDone: boolean;
  public point: number;
  public time: number;

  constructor( exam: IExam) {
    this.title = exam.title || 'No Title';
    this.questions = exam.questions || [];
    this.isDone = exam.isDone || false;
    this.point = exam.point || 0;
    this.time = exam.time || 0;
  }
}
