import { Injectable } from '@angular/core';
import { GraphQLError } from 'graphql';

// Queries
export type TRetrieveAdminResponseDataType =
{
  type: "admin";
  firstName: string;
  lastName: string;
  email: string;
};

export type TListAdminsResponseDataType =
{
  firstName: string;
  lastName: string;
  email: string;
}[];

export type TRetrieveStudentResponseDataType =
{
  type: "student";
  firstName: string;
  lastName: string;
  email: string;
  class: {
    string: string;
  };
  grades: {
    value: number;
    timestamp: string;
    description: string;
    subject: {
      name: string;
      description: string;
    };
  }[];
};

export type TListStudentsResponseDataType =
{
  firstName: string;
  lastName: string;
  email: string;
  class: {
    string: string;
  };
}[];

export type TRetrieveTeacherResponseDataType =
{
  type: "teacher";
  firstName: string;
  lastName: string;
  email: string;
  classes: {
    name: string;
  }[];
};

export type TListTeachersResponseDataType =
{
  firstName: string;
  lastName: string;
  email: string;
}[];

export type TRetrieveUserResponseDataType =
| TRetrieveAdminResponseDataType
| TRetrieveStudentResponseDataType
| TRetrieveTeacherResponseDataType;

export type TRetrieveClassResponseDataType =
{
  name: string;
  students: {
    firstName: string;
    lastName: string;
    email: string;
  }[];
};

export type TListClassesResponseDataType =
{
  name: string;
}[];

export type TListSubjectsResponseDataType =
{
  name: string;
}[];

// Mutations
type TCreateAuthTokenResponseDataType = { id: string };

type TCreateGradeResponseDataType = {
  value: number;
  timestamp: string;
  description: string;
};

interface IApiServiceResponse<T>
{
  data?: T;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  private readonly ENDPOINT = "http://localhost:4000/graphql";

  private async send<T>(name: string, query: string): Promise<IApiServiceResponse<T>>
  {
    const response = await fetch(this.ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("user.token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json: { data?: { [ name: string]: T }, errors?: GraphQLError[] } = await response.json();

    return {
      data: json.data?.[name],
      errors: json.errors?.map(error => error.message),
    };
  }

  public async retrieveUser({ email }: { email: string }): Promise<IApiServiceResponse<TRetrieveUserResponseDataType>>
  {
    return this.send<TRetrieveUserResponseDataType>("user", `
      {
        user(id: "${email}")
        {
          ... on Admin
          {
            type
            firstName
            lastName
            email
          }
          ... on Student
          {
            type
            firstName
            lastName
            email
            class
            {
              name
            }
          }
          ... on Teacher
          {
            type
            firstName
            lastName
            email
            classes
            {
              name
            }
          }
        }
      }
    `);
  }

  public async listAdmins(): Promise<IApiServiceResponse<TListAdminsResponseDataType>>
  {
    return this.send<TListAdminsResponseDataType>("admins", `
      {
        admins
        {
          firstName
          lastName
          email
        }
      }
    `);
  }

  public async retrieveStudent({ id }: { id: string }): Promise<IApiServiceResponse<TRetrieveStudentResponseDataType>>
  {
    return this.send<TRetrieveStudentResponseDataType>("student", `
      {
        student(id: "${id}")
        {
          type
          firstName
          lastName
          email
          class
          {
            name
          }
          grades
          {
            value
            timestamp
            description
            subject
            {
              name
              description
            }
          }
        }
      }
    `);
  }

  public async listStudents(): Promise<IApiServiceResponse<TListStudentsResponseDataType>>
  {
    return this.send<TListStudentsResponseDataType>("students", `
      {
        students
        {
          firstName
          lastName
          email
          class
          {
            name
          }
        }
      }
    `);
  }

  public async listTeachers(): Promise<IApiServiceResponse<TListTeachersResponseDataType>>
  {
    return this.send<TListTeachersResponseDataType>("teachers", `
      {
        teachers
        {
          firstName
          lastName
          email
        }
      }
    `);
  }

  public async retrieveClass({ id }: { id: string }): Promise<IApiServiceResponse<TRetrieveClassResponseDataType>>
  {
    return this.send<TRetrieveClassResponseDataType>("class", `
      {
        class(id: "${id}")
        {
          name
          students
          {
            firstName
            lastName
            email
          }
        }
      }
    `);
  }

  public async listClasses(): Promise<IApiServiceResponse<TListClassesResponseDataType>>
  {
    return this.send<TListClassesResponseDataType>("classes", `
      {
        classes
        {
          name
        }
      }
    `);
  }

  public async listSubjects(): Promise<IApiServiceResponse<TListSubjectsResponseDataType>>
  {
    return this.send<TListSubjectsResponseDataType>("subjects", `
      {
        subjects
        {
          name
        }
      }
    `);
  }

  public async createAuthToken({ email, password }: { email: string, password: string }): Promise<IApiServiceResponse<TCreateAuthTokenResponseDataType>>
  {
    return this.send<TCreateAuthTokenResponseDataType>("createAuthToken", `
      mutation
      {
        createAuthToken(email: "${email}", password: "${password}")
        { id }
      }
    `);
  }

  public async createGrade({
    value, timestamp, description, student, subject
  }: {
    value: number, timestamp: string, description: string, student: string, subject: string
  }): Promise<IApiServiceResponse<TCreateGradeResponseDataType>>
  {
    return this.send<TCreateGradeResponseDataType>("createGrade", `
      mutation
      {
        createGrade(
          value: ${value}
          timestamp: "${timestamp}"
          description: "${description}"
          student: "${student}"
          subject: "${subject}"
        )
        {
          value
          timestamp
          description
        }
      }
    `);
  }
}
