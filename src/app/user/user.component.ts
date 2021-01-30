import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IStudent, IUser } from '../services/api/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
{
  public user?: IUser;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api
      .retrieveUser(route.snapshot.params["id"])
      .then(result =>
      {
        this.user = result.data;
      });
  }
}
