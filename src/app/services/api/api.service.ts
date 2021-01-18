import { Injectable } from '@angular/core';
import { GraphQLError } from 'graphql';

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

  public async createAuthToken({ email, password }: { email: string, password: string }): Promise<IApiServiceResponse<TCreateAuthTokenResponseDataType>>
  {
    const response = await fetch(this.ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation
          {
            createAuthToken(email: "${email}", password: "${password}")
            { id }
          }
        `,
      }),
    });

    const json: { data: any, errors: GraphQLError[] } = await response.json();

    return {
      data: json.data,
      errors: json.errors.map(error => error.message),
    };
  }
}
