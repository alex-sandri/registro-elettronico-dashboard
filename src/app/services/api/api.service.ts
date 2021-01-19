import { Injectable } from '@angular/core';
import { GraphQLError } from 'graphql';

// Queries
export type TRetrieveUserResponseDataType = {
  type: "admin" | "student" | "teacher";
  firstName: string;
  lastName: string;
  email: string;
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
        user(email: "${email}")
        {
          type
          firstName
          lastName
          email
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
