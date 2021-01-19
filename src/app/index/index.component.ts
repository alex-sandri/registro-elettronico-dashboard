import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent
{
  showPassword = false;
  disableButton = false;

  @ViewChild("email")
  emailInput?: ElementRef<HTMLInputElement>;

  @ViewChild("password")
  passwordInput?: ElementRef<HTMLInputElement>;

  constructor (private api: ApiService, private dialog: MatDialog, private router: Router)
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
    else if (result.data)
    {
      localStorage.setItem("token", result.data.id);

      this.router.navigateByUrl("account");
    }

    this.disableButton = false;
  }
}
