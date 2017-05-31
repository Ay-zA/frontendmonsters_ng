import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CourseService, UserService } from '../services';
import { Course } from '../models';

@Injectable()
export class CourseResolver implements Resolve<Course> {

  constructor(private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let courseUTitle = route.params['courseUTitle'];
    return this.courseService.getCourseByUTitle(courseUTitle);
  }
}

@Injectable()
export class UpCoursesResolver implements Resolve<Course> {

  constructor(private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.courseService.getAllUpCourses();
  }
}

@Injectable()
export class UserCoursesResolver implements Resolve<Course> {

  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getAllAccessableCourses();
  }
}

@Injectable()
export class UserCourseResolver implements Resolve<Course> {

  constructor(
    private userService: UserService,
    private courseService: CourseService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    let courseUTitle = route.params['courseUTitle'];
    if (this.userService.currentUser.role === 0) {
      return this.userService.getCourseByUTitle(courseUTitle);
    }
    return this.courseService.getCourseByUTitle(courseUTitle);

  }
}
