import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatSelectModule } from '@angular/material/select';

import { HeaderComponent } from './components/header/header.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { AccountComponent } from './account/account.component';
import { IndexComponent } from './index/index.component';
import { ClassComponent } from './class/class.component';
import { CreateGradeDialogComponent } from './components/create-grade-dialog/create-grade-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertDialogComponent,
    AccountComponent,
    IndexComponent,
    ClassComponent,
    CreateGradeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "it-IT" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
