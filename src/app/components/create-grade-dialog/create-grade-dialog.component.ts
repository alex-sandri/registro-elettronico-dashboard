import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create-grade-dialog',
  templateUrl: './create-grade-dialog.component.html',
  styleUrls: ['./create-grade-dialog.component.scss']
})
export class CreateGradeDialogComponent
{
  constructor(private api: ApiService)
  {}

  public async onSubmit(e?: Event): Promise<void>
  {
    e?.preventDefault();

    const result = await this.api.createGrade({
      value: 10,
      timestamp: new Date().toISOString(),
      description: "",
      student: "",
      subject: "",
    });

    console.log(result);
  }
}
