import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'registro-elettronico-dashboard';

  canLoad = false;

  constructor (auth: AuthService, router: Router)
  {
    auth.init().then(user =>
    {
      if (user && location.pathname === "/")
      {
        router.navigateByUrl("account");
      }

      this.canLoad = true;
    });
  }
}
