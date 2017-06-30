import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { AuthHttpService } from './auth-http.service';
import { CourseService } from './course.service';
import { RequestService } from './request.service';

import { User, Course, Lesson, Exercise, Roles, Request } from '../models';

@Injectable()
export class UserService {
  private _cachedUser: User;
  get currentUser(): User {
    if (!this.authService.isLoggedIn()) {
      this._cachedUser = null;
      return null;
    }
    if (this._cachedUser) {
      return this._cachedUser;
    }
    this._cachedUser = new User(this.authService.extractUserFromToken());
    console.log(this._cachedUser);
    return this._cachedUser;
  }

  public getRole() {
    return this.currentUser.role;
  }

  constructor(private authService: AuthService,
    private authHttp: AuthHttpService,
    private courseService: CourseService,
    private router: Router,
    private requestService: RequestService) { }

  takeCourse(course) {
    if (!this.currentUser) {
      console.warn('[takeCourse]: User not found');
      return;
    }

    if (this.haveCourse(course)) {
      return;
    }

    this.currentUser.courseTitles.push(course.title);
    let data = { courseId: course._id };
    return this.authHttp.post(`api/users/${this.currentUser._id}/take`, data).map(res => {
      // console.log(res.json());
      return res.json();
    });
  }

  haveCourse(course) {
    if (!this.currentUser) {
      console.warn('[haveCourse]: User not found');
      return;
    }
    return this.currentUser.courseTitles.indexOf(course.title) !== -1;
  }

  exerciseCompeleted(course: Course, lesson: Lesson, exerciseIndex: number) {
    let userId = this.currentUser._id;
    let data = {
      courseUTitle: course.uTitle,
      lessonUTitle: lesson.uTitle,
      exerciseIndex: exerciseIndex
    };
    return this.authHttp.post(`/api/users/${userId}/done/exercise`, data).map((response) => {
      let jsonResponse = response.json();
      if (!jsonResponse.success) {
        console.log(jsonResponse.message);
        return jsonResponse;
      }

      console.log(jsonResponse);
      return jsonResponse;
    });
  }

  getCourseByUTitle(courseUTitle) {
    return this.courseService.getUserCourseByUTitle(this.currentUser, courseUTitle);
  }

  signout() {
    this._cachedUser = null;
    this.authService.signout();
    this.router.navigate(['/']);
  }

  getAllUsers() {
    return this.authHttp.get('/api/users/').map((response) => {
      let jsonResponse = response.json();
      if (!jsonResponse.success) {
        console.log(jsonResponse.message);
        return jsonResponse;
      }

      console.log(jsonResponse);
      return jsonResponse.data.map(user => new User(user));
    });

  }

  getAllAccessableCourses() {
    switch (this.currentUser.role) {
      case Roles.Student:
        return this.courseService.getUserCourses(this.currentUser);
      case Roles.Master:
        return this.courseService.getAllMasterCourses(this.currentUser);
      case Roles.Admin:
        return this.courseService.getAllAdminCourses();
    }
  }

  makeRequest(request: Request) {
    return this.requestService.makeRequest(this.currentUser, request);
  }
}
