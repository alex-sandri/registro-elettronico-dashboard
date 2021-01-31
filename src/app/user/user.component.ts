import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IUser } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
{
  public user?: IUser;

  constructor(api: ApiService, route: ActivatedRoute, public auth: AuthService)
  {
    api
      .retrieveUser(route.snapshot.params["id"])
      .then(result =>
      {
        this.user = result.data;
      });
  }

  public async delete(): Promise<void>
  {
    // TODO
  }
}
