import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IClass, IStudent } from '../services/api/api.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent
{
  public class?: IClass;

  public students?: IStudent[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api
      .retrieveClass(route.snapshot.params["id"])
      .then(result =>
      {
        this.class = result.data;
      });

    api
      .retrieveStudents(route.snapshot.params["id"])
      .then(result =>
      {
        this.students = result.data;
      });
  }
}
