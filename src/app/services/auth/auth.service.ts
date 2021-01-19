import { Injectable } from '@angular/core';
import { ApiService, TRetrieveUserResponseDataType } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: TRetrieveUserResponseDataType;

  constructor(private api: ApiService)
  {}

  public async init(): Promise<TRetrieveUserResponseDataType | null>
  {
    const email = localStorage.getItem("user.email");

    if (!email)
    {
      return null;
    }

    const { data } = await this.api.retrieveUser({ email });

    this.user = data;

    return data ?? null;
  }
}
