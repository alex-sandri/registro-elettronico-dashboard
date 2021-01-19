import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, TRetrieveClassResponseDataType } from '../services/api/api.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent
{
  public class?: TRetrieveClassResponseDataType;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api
      .retrieveClass({ id: route.snapshot.params["id"] })
      .then(result =>
      {
        this.class = result.data;
      });
  }
}
