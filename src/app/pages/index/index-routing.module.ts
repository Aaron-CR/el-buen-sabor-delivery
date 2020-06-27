import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  {path: 'auth/resetPassword', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
