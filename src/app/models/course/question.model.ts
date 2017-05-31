interface IQuestion {
  question?: string;
  isDone?: boolean;
  point?: number;
}

export class Question {
  public question: string;
  public isDone: boolean;
  public point: number;

  constructor(question: IQuestion) {
    this.question = question.question || 'Empty Question';
    this.isDone = question.isDone || false;
    this.point = question.point || 0;
  }
}
