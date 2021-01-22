import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGradeDialogComponent } from '../create-grade-dialog/create-grade-dialog.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent
{
  // TODO: Support every type of user
  @Input("students")
  public students?: {
    firstName: string;
    lastName: string;
    email: string;
    class?: {
      name: string;
    };
  }[];

  constructor (private dialog: MatDialog)
  {}

  public async createGrade(student: string): Promise<void>
  {
    this.dialog.open(CreateGradeDialogComponent, {
      data: { student },
    });
  }
}
