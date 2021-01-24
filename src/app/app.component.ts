import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'registro-elettronico-dashboard';

  public user?: IUser;

  public canLoad = false;

  constructor (public auth: AuthService, router: Router)
  {
    auth.init().then(user =>
    {
      this.user = user ?? undefined;

      if (user && location.pathname === "/")
      {
        router.navigateByUrl("account");
      }

      this.canLoad = true;
    });
  }
}
