import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';

const routes: Routes = [
  { path: "account", component: AccountComponent, canActivate: [ SignedInGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
