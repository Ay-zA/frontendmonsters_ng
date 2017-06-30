import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AceEditorComponent } from 'ng2-ace-editor';
import { AppRoutingModule } from './app-routing.module';
import { JwtProvider } from './jwt-config';

import { NameToAvatarPipe } from './pipes/name-to-avatar.pipe';

import { CourseResolver, UserCourseResolver, UserCoursesResolver, UserResolver,
  AllUsersResolver, UpCoursesResolver, RequestResolver } from './resolvers';
import { AuthService, AuthHttpService, CourseService, UserService, RequestService,
  AdminService, NotificationService } from './services';

import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { GuestComponent } from './components/guest';

import { AuthComponent } from './components/auth';
import { LoginComponent } from './components/auth/login';
import { RegisterComponent } from './components/auth/register';

import { DashboardComponent } from './components/dashboard';
import { AvatarComponent } from './components/dashboard/avatar';
import { CourseQuickshowComponent } from './components/dashboard/course/quickshow';
import { CourseButtonComponent } from './components/dashboard/course/button';
import { SidebarComponent } from './components/dashboard/sidebar';
import { PanelHomeComponent } from './components/dashboard/panels/home';
import { PanelAcademyComponent } from './components/dashboard/panels/academy';
import { PanelStaticsComponent } from './components/dashboard/panels/statics';
import { PanelAccountComponent } from './components/dashboard/panels/account';
import { PanelManageCoursesComponent } from './components/dashboard/panels/manage-courses';
import { PanelTestComponent } from './components/dashboard/panels/test';
import { RequestComponent } from './components/dashboard/panels/request';
import { WorkplaceComponent } from './components/dashboard/panels/workplace';
import { TerminalComponent } from './components/terminal';
import { LearnComponent } from './components/dashboard/course/exercise/learn';
import { ExerciseComponent } from './components/dashboard/course/exercise';
import { CourseComponent } from './components/dashboard/course';
import { AdminComponent } from './components/dashboard/panels/home/admin';
import { MasterComponent } from './components/dashboard/panels/home/master';
import { StudentComponent } from './components/dashboard/panels/home/student';
import { CourseTableComponent } from './components/dashboard/course/table';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { PanelManageUsersComponent } from './components/dashboard/panels/manage-users';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CourseEditorComponent } from './components/dashboard/course/editor';
import { CreateCourseComponent } from './components/dashboard/course/editor/create-course';
import { CreateExerciseComponent } from './components/dashboard/course/editor/create-exercise';
import { EditorTableComponent } from './components/dashboard/course/editor/table';
import { EditableLabelComponent } from './components/editable-label';
import { NewExerciseComponent } from './components/dashboard/course/editor/new-exercise';
import { ExerciseEditorTableComponent } from './components/dashboard/course/editor/exercise-editor-table';
import { PanelManageRequestsComponent } from './components/dashboard/panels/manage-requests';
import { NotificationComponent } from './components/dashboard/notification/notification.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CourseButtonComponent,
    SidebarComponent,
    GuestComponent,
    AvatarComponent,
    NameToAvatarPipe,
    AuthComponent,
    CourseQuickshowComponent,
    PanelHomeComponent,
    PanelAcademyComponent,
    PanelStaticsComponent,
    PanelAccountComponent,
    WorkplaceComponent,
    AceEditorComponent,
    TerminalComponent,
    LearnComponent,
    ExerciseComponent,
    CourseComponent,
    AdminComponent,
    MasterComponent,
    StudentComponent,
    PanelManageCoursesComponent,
    CourseTableComponent,
    LoadingBarComponent,
    PanelManageUsersComponent,
    UserTableComponent,
    CreateCourseComponent,
    CourseEditorComponent,
    CreateExerciseComponent,
    EditorTableComponent,
    EditableLabelComponent,
    NewExerciseComponent,
    ExerciseEditorTableComponent,
    PanelTestComponent,
    RequestComponent,
    PanelManageRequestsComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    JwtProvider,
    AuthGuard,
    AuthService,
    CourseService,
    AuthHttpService,
    RequestService,
    UserService,
    AdminService,
    NotificationService,
    UserResolver,
    UserCourseResolver,
    UserCoursesResolver,
    CourseResolver,
    UpCoursesResolver,
    AllUsersResolver,
    RequestResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
