import { Injectable } from '@angular/core';
import { GraphQLError } from 'graphql';

// Queries
export type TRetrieveUserResponseDataType =
{
  type: "admin";
  firstName: string;
  lastName: string;
  email: string;
}
|
{
  type: "student";
  firstName: string;
  lastName: string;
  email: string;
  class: {
    string: string;
  };
}
|
{
  type: "teacher";
  firstName: string;
  lastName: string;
  email: string;
  teachings: {
    class: {
      name: string;
    };
    subject: {
      name: string;
    };
  }[];
};

export type TRetrieveClassResponseDataType =
{
  name: string;
  students: {
    firstName: string;
    lastName: string;
    email: string;
    grades: {
      value: number;
      timestamp: string;
      description: string;
      subject: {
        name: string;
        description: string;
      };
    }[];
  }[];
};

// Mutations
type TCreateAuthTokenResponseDataType = { id: string };

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
            teachings
            {
              class
              {
                name
              }
              subject
              {
                name
              }
            }
          }
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
}
