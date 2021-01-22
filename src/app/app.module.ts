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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { AccountComponent } from './account/account.component';
import { IndexComponent } from './index/index.component';
import { ClassComponent } from './class/class.component';
import { CreateGradeDialogComponent } from './components/create-grade-dialog/create-grade-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertDialogComponent,
    AccountComponent,
    IndexComponent,
    ClassComponent,
    CreateGradeDialogComponent,
    StudentComponent
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
    ReactiveFormsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "it-IT" },
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: "0ms" } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
