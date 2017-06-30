import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseResolver, UserCourseResolver, UserCoursesResolver, UserResolver,
  AllUsersResolver, UpCoursesResolver, RequestResolver} from './resolvers';

import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './components/dashboard';
import { GuestComponent } from './components/guest';
import { PanelHomeComponent } from './components/dashboard/panels/home';
import { PanelManageCoursesComponent } from './components/dashboard/panels/manage-courses';
import { PanelManageRequestsComponent } from './components/dashboard/panels/manage-requests';
import { PanelManageUsersComponent } from './components/dashboard/panels/manage-users';
import { PanelAcademyComponent } from './components/dashboard/panels/academy';
import { PanelAccountComponent } from './components/dashboard/panels/account';
import { PanelStaticsComponent } from './components/dashboard/panels/statics';
import { WorkplaceComponent } from './components/dashboard/panels/workplace';
import { PanelTestComponent } from './components/dashboard/panels/test';
import { ExerciseComponent } from './components/dashboard/course/exercise';
import { CourseComponent } from './components/dashboard/course';
import { CourseEditorComponent } from './components/dashboard/course/editor';

const routes: Routes = [
  { path: '', component: GuestComponent },
  {
    // TODO: Add
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], resolve: { user: UserResolver }, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'test', component: PanelTestComponent },
      { path: 'home', component: PanelHomeComponent, resolve: { user: UserResolver, courses: UserCoursesResolver } },
      { path: 'academy', component: PanelAcademyComponent, resolve: { courses: UpCoursesResolver } },
      { path: 'statics', component: PanelStaticsComponent },
      { path: 'account', component: PanelAccountComponent, resolve: { user: UserResolver } },
      { path: 'manage/courses', component: PanelManageCoursesComponent, resolve: { allCourses: UserCoursesResolver, user: UserResolver } },
      { path: 'manage/mycourses', component: PanelManageCoursesComponent, resolve: { allCourses: UserCoursesResolver } },
      { path: 'manage/users', component: PanelManageUsersComponent, resolve: { allUsers: AllUsersResolver } },
      { path: 'manage/requests', component: PanelManageRequestsComponent, resolve: { requests: RequestResolver } },
      {
        path: 'courses', component: WorkplaceComponent, children: [
          { path: 'editor/:courseUTitle', component: CourseEditorComponent, resolve: { course: CourseResolver } },
          { path: ':courseUTitle', component: CourseComponent, resolve: { course: UserCourseResolver } },
          { path: ':courseUTitle/:lessonUTitle', component: CourseComponent, resolve: { course: UserCourseResolver } },
          { path: ':courseUTitle/:lessonUTitle/:exerciseIndex', component: ExerciseComponent, resolve: { course: UserCourseResolver } }
        ]
      }
    ]
  },
  { path: '**', component: GuestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
