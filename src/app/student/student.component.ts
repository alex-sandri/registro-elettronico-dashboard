import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, TRetrieveStudentResponseDataType } from '../services/api/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent
{
  public student?: TRetrieveStudentResponseDataType;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api
      .retrieveStudent({ id: route.snapshot.params["id"] })
      .then(result =>
      {
        this.student = result.data;
      });
  }
}
