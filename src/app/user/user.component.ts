import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IStudent } from '../services/api/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent
{
  public student?: IStudent;

  public subjects: {
    name: string;
    grades: {
      value: number;
      timestamp: string;
      description: string;
    }[];
  }[] = [];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api
      .retrieveStudent(route.snapshot.params["id"])
      .then(result =>
      {
        this.student = result.data!;

        return api.retrieveGrades(this.student.email);
      })
      .then(result =>
      {
        const grades = result.data!;

        const subjects = new Set(grades.map(_ => _.subject.name));

        subjects.forEach(subject => this.subjects.push({
          name: subject,
          grades: grades
            .filter(grade => grade.subject.name === subject)
            .map(_ => ({
              value: _.value,
              timestamp: new Date(_.timestamp).toLocaleDateString(),
              description: _.description
            })) ?? [],
        }));
      });
  }
}
