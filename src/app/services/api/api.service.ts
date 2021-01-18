import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

type TCreateAuthTokenResponseDataType = { id: string };

interface IApiServiceResponse<T>
{
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor(private apollo: Apollo)
  {}

  public async createAuthToken({ email, password }: { email: string, password: string }): Promise<IApiServiceResponse<TCreateAuthTokenResponseDataType>>
  {
    return new Promise(resolve =>
    {
      const response: IApiServiceResponse<TCreateAuthTokenResponseDataType> = {};

      this.apollo
        .mutate({
          mutation: gql`
            mutation CreateAuthToken($email: Email!, $password: Password!)
            {
              createAuthToken(email: $email, password: $password)
              { id }
            }
          `,
          variables: { email, password },
        })
        .toPromise()
        .then(result =>
        {
          response.data = (result.data as any).createAuthToken.data as TCreateAuthTokenResponseDataType;

          resolve(response);
        })
        .catch((error: ApolloError) =>
        {
          response.error = error.message;

          resolve(response);
        });
    });
  }
}
