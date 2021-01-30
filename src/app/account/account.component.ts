import { Component } from '@angular/core';
import { ApiService, IAdmin, IClass, IStudent, ITeacher } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent
{
  public user = this.auth.user;

  public admin = this.user?.type === "admin" ? this.user : null;
  public student = this.user?.type === "student" ? this.user : null;
  public teacher = this.user?.type === "teacher" ? this.user : null;

  public classList?: IClass[];

  public adminList?: IAdmin[];
  public studentList?: IStudent[];
  public teacherList?: ITeacher[];

  constructor(private auth: AuthService, private api: ApiService)
  {
    this.api
      .listClasses()
      .then(_ => this.classList = _.data);

    this.api
      .listAdmins()
      .then(_ => this.adminList = _.data);

    this.api
      .listStudents()
      .then(_ => this.studentList = _.data);

    this.api
      .listTeachers()
      .then(_ => this.teacherList = _.data);
  }
}
