import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import { ApiService, ISubject } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-grade-dialog',
  templateUrl: './create-grade-dialog.component.html',
  styleUrls: ['./create-grade-dialog.component.scss']
})
export class CreateGradeDialogComponent
{
  public createGrade = new FormGroup({
    value: new FormControl(),
    timestamp: new FormControl(),
    description: new FormControl(),
  });

  public subjects?: ISubject[];

  public subject?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { student: string }, private api: ApiService)
  {
    api
      .listSubjects()
      .then(_ => this.subjects = _.data);
  }

  public async onSubmit(e?: Event): Promise<void>
  {
    e?.preventDefault();

    const value: number = this.createGrade.get("value")?.value;
    const timestamp: Moment = this.createGrade.get("timestamp")?.value;
    const description: string = this.createGrade.get("description")?.value;
    const subject = this.subject ?? "";

    await this.api.createGrade({
      value,
      timestamp: timestamp.toISOString(),
      description,
      student: this.data.student,
      subject,
    });
  }
}
