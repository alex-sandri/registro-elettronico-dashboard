import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { SignedInGuard } from './guards/signed-in/signed-in.guard';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "account", component: AccountComponent, canActivate: [ SignedInGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
