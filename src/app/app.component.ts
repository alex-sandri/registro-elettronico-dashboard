import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApolloError } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'registro-elettronico-dashboard';

  showPassword = false;

  @ViewChild("email")
  emailInput?: ElementRef<HTMLInputElement>;

  @ViewChild("password")
  passwordInput?: ElementRef<HTMLInputElement>;

  constructor (private apollo: Apollo, private dialog: MatDialog)
  {}

  onSubmit(e: Event)
  {
    e.preventDefault();

    const email = this.emailInput?.nativeElement.value ?? "";
    const password = this.passwordInput?.nativeElement.value ?? "";

    this.apollo
      .mutate({
        mutation: gql`
          mutation CreateAuthToken($email: Email!, $password: Password!)
          {
            createAuthToken(email: $email, password: $password)
            {
              id
            }
          }
        `,
        variables: {
          email,
          password,
        },
      })
      .toPromise()
      .then(result =>
      {
        localStorage.setItem("token", (result.data as any).createAuthToken.id)
      })
      .catch((error: ApolloError) =>
      {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: "Errore",
            message: error.message,
          },
        });
      });
  }
}
