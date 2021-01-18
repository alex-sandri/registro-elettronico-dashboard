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
  disableButton = false;

  @ViewChild("email")
  emailInput?: ElementRef<HTMLInputElement>;

  @ViewChild("password")
  passwordInput?: ElementRef<HTMLInputElement>;

  constructor (private api: ApiService, private dialog: MatDialog)
  {}

  async onSubmit(e: Event)
  {
    e.preventDefault();

    this.disableButton = true;

    const email = this.emailInput?.nativeElement.value ?? "";
    const password = this.passwordInput?.nativeElement.value ?? "";

    const result = await this.api.createAuthToken({ email, password });

    if (result.errors)
    {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: "Errore",
          message: result.errors[0],
        },
      });
    }
    else
    {
      // TODO: Redirect to account page
    }

    this.disableButton = false;
  }
}
