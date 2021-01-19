import { Component } from '@angular/core';
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

  constructor (auth: AuthService)
  {
    auth.init().then(() =>
    {
      this.canLoad = true;
    });
  }
}
