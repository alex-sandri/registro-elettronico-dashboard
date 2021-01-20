import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-grade-dialog',
  templateUrl: './create-grade-dialog.component.html',
  styleUrls: ['./create-grade-dialog.component.scss']
})
export class CreateGradeDialogComponent
{
  @ViewChild("value")
  public valueInput?: ElementRef<HTMLInputElement>;

  @ViewChild("timestamp")
  public timestampInput?: ElementRef<HTMLInputElement>;

  @ViewChild("description")
  public descriptionInput?: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { student: string; subject: string; }, private api: ApiService)
  {}

  public async onSubmit(e?: Event): Promise<void>
  {
    e?.preventDefault();

    const value = parseInt(this.valueInput?.nativeElement.value ?? "", 10);
    const timestamp = this.timestampInput?.nativeElement.value ?? "";
    const description = this.descriptionInput?.nativeElement.value ?? "";

    const result = await this.api.createGrade({
      value,
      timestamp,
      description,
      student: this.data.student,
      subject: this.data.subject,
    });

    console.log(result);
  }
}
