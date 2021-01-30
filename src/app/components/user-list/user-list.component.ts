import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAdmin, IStudent, ITeacher } from 'src/app/services/api/api.service';
import { CreateGradeDialogComponent } from '../create-grade-dialog/create-grade-dialog.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent
{
  @Input("admins")
  public admins?: IAdmin[];

  @Input("students")
  public students?: IStudent[];

  @Input("teachers")
  public teachers?: ITeacher[];

  constructor (private dialog: MatDialog)
  {}

  public async createGrade(student: string): Promise<void>
  {
    this.dialog.open(CreateGradeDialogComponent, {
      data: { student },
    });
  }
}
