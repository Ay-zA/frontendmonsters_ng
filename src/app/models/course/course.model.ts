import { Lesson } from './lesson.model';

export enum CourseStatus {
  Down = 0,
  Pending,
  Up,
  Archived
};

interface ICourse {
  _id?: string;
  uTitle?: string;
  title?: string;
  subtitle?: string;
  overview?: string;
  abouts?: IAbout[];
  author?: string;
  time?: number;
  lessons?: Lesson[];
  donePercent?: number;
  icon?: string;
  new?: boolean;
  status?: CourseStatus;
}

interface IAbout {
  title: string;
  about: string;
}

export class Course {
  public _id: string;
  public uTitle: string;
  public title: string;
  public subtitle: string;
  public overview: string;
  public abouts: IAbout[];
  public author: string;
  public time: number;
  public lessons: Lesson[];
  public donePercent: number;
  public icon: string;
  public new: boolean;
  public status: CourseStatus;
  public examCount: number;
  public exerciseCount: number;

  constructor(course: ICourse) {
    this._id = course._id || 'NOID';
    this.uTitle = course.uTitle || '';
    this.title = course.title || '';
    this.subtitle = course.subtitle || '';
    this.overview = course.overview || '';
    this.abouts = course.abouts || [];
    this.author = course.author || '';
    this.lessons = !!course.lessons ? course.lessons.map(lesson => new Lesson(lesson)) : [];
    this.donePercent = course.donePercent || 0;
    this.icon = course.icon || '';
    this.new = course.new || false;
    this.status = course.status || 0;
    this.time = 0;
    this.examCount = 0;
    this.exerciseCount = 0;

    this.updateCourseInfo();

  }

  public updateCourseInfo() {
    for (let lesson of this.lessons) {
      if (lesson.hasOwnProperty('exercises')) {
        this.exerciseCount += lesson.exercises.length;
      }
      if (lesson.hasOwnProperty('exams')) {
        this.examCount += lesson.exams.length;
      }

      this.time += lesson.time;
    }
  }

  public getLessonByUTitle(lessonUTitle): Lesson {
    let lesson = this.lessons.filter((retrievedLesson) => {
      return retrievedLesson.uTitle === lessonUTitle;
    });
    return lesson[0] || null;
  }

  public getLessonIndex(lessonTitle) {
    return this.lessons.indexOf(lessonTitle);
  }

  public deleteNthLesson(lessonIndex) {
    this.lessons.splice(lessonIndex);
    this.updateCourseInfo();
  }

  get statusName() {
    switch (this.status) {
      case 0:
        return 'Down';
      case 1:
        return 'Pending';
      case 2:
        return 'Up';
    }
  }
}
