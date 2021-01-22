import { Component, Input } from '@angular/core';
import { TListClassesResponseDataType } from 'src/app/services/api/api.service';

@Component({
  selector: 'class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent
{
  @Input("classes")
  public classes?: TListClassesResponseDataType;
}
