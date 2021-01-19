import { Component } from '@angular/core';
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

  constructor(private auth: AuthService)
  {}
}
