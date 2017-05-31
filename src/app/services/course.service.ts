import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttpService } from './auth-http.service';
import { Course, Lesson, Exercise, User } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CourseService {

  public _cachedCourse;
  public _cachedData: Course;

  constructor(private authHttp: AuthHttpService) { }

  getAllUpCourses() {
    return this.authHttp.get('/api/courses/up')
      .map(this.handleGetCourse)
      .catch(this.handleError);
  }

  getUserCourses(user) {
    let userId = user._id;

    return this.authHttp.get(`/api/users/${userId}/courses`)
      .map(this.handleGetCourse)
      .catch(this.handleError);
  }

  getCourseByUTitle(courseUTitle: string): Observable<Course> {
    this._cachedCourse = this.authHttp.get(`/api/courses/${courseUTitle}`)
      .map(this.handleGetCourse)
      .catch(this.handleError);

    return this._cachedCourse;
  }

  getUserCourseByUTitle(user: User, courseUTitle) {
    let userId = user._id;

    this._cachedCourse = this.authHttp.get(`/api/users/${userId}/courses/${courseUTitle}`)
      .map(this.handleGetCourse)
      .catch(this.handleError);

    return this._cachedCourse;
  }

  getAllMasterCourses(master: User) {
    let masterId = master._id;

    return this.authHttp.get(`/api/users/${masterId}/mycourses`)
      .map(this.handleGetCourse)
      .catch(this.handleError);
  }

  getAllAdminCourses() {
    return this.authHttp.get(`/api/courses/admin`)
      .map(this.handleGetCourse)
      .catch(this.handleError);
  }


  private handleError(err) {
    return Observable.throw(err);
  }

  private handleGetCourse(res: Response) {

    if (!res.json()) {
      throw new Error('[CourseService]: NO RESPONSE');
    }

    let json = res.json();

    if (json.success === false) {
      throw json.error;
    }

    if (json.data.hasOwnProperty('length')) {
      return json.data.map(course => new Course(course));
    }

    this._cachedData = new Course(json.data);
    return this._cachedData;
  }

  createCourse(course: Course) {
    return this.authHttp.post('/api/courses/', course).map(this.handleStatusResponse);
  }

  updateCourse(course: Course) {
    return this.authHttp.post('/api/courses/update', course).map(this.handleStatusResponse);
  }

  deleteCourse(courseId: string) {
    return this.authHttp.delete(`/api/courses/${courseId}`).map(this.handleStatusResponse);
  }

  sendCourse(courseId: string) {
    let data = { _id: courseId };
    return this.authHttp.post('/api/courses/send', data).map(this.handleStatusResponse);
  }

  takeback(courseId: string) {
    let data = { _id: courseId };
    return this.authHttp.post('/api/courses/takeback', data).map(this.handleStatusResponse);
  }

  accept(courseId: string) {
    let data = { _id: courseId };
    return this.authHttp.post('/api/courses/accept', data).map(this.handleStatusResponse);
  }

  reject(courseId: string) {
    let data = { _id: courseId };
    return this.authHttp.post('/api/courses/reject', data).map(this.handleStatusResponse);
  }

  handleStatusResponse(res) {
    console.log('[CourseService]: ');
    let json = res.json();
    console.log(json);
    return json;
  }
}
