import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, IUser } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user?: IUser;

  constructor(private api: ApiService, private router: Router)
  {}

  public async init(): Promise<IUser | null>
  {
    const email = localStorage.getItem("user.email");

    if (!email)
    {
      return null;
    }

    const { data } = await this.api.retrieveUser(email);

    this.user = data;

    return data ?? null;
  }

  public async signOut(): Promise<void>
  {
    localStorage.clear();

    this.router.navigateByUrl("/");
  }
}
