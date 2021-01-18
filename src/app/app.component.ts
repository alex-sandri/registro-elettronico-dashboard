import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ApiService } from './services/api/api.service';

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

  constructor (private api: ApiService, private dialog: MatDialog)
  {}

  onSubmit(e: Event)
  {
    e.preventDefault();

    const email = this.emailInput?.nativeElement.value ?? "";
    const password = this.passwordInput?.nativeElement.value ?? "";

    this.api
      .createAuthToken({ email, password })
      .then(result =>
      {
        if (result.error)
        {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: "Errore",
              message: result.error,
            },
          });
        }
        else
        {
          // TODO: Redirect to account page
        }
      });
  }
}
