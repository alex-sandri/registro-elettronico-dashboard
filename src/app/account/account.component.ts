import { Component } from '@angular/core';
import { ApiService, TListClassesResponseDataType } from '../services/api/api.service';
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

  public classList?: TListClassesResponseDataType;

  constructor(private auth: AuthService, private api: ApiService)
  {
    this.api
      .listClasses()
      .then(_ => this.classList = _.data);
  }
}
