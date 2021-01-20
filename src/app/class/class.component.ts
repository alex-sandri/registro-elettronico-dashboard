import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateGradeDialogComponent } from '../components/create-grade-dialog/create-grade-dialog.component';
import { ApiService, TRetrieveClassResponseDataType } from '../services/api/api.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent
{
  public class?: TRetrieveClassResponseDataType;

  constructor(api: ApiService, route: ActivatedRoute, private dialog: MatDialog)
  {
    api
      .retrieveClass({ id: route.snapshot.params["id"] })
      .then(result =>
      {
        this.class = result.data;
      });
  }

  public async createGrade(student: string): Promise<void>
  {
    this.dialog.open(CreateGradeDialogComponent, {
      data: {
        subject: "",
        student,
      },
    });
  }
}
