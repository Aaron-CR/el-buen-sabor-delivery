import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAddressesComponent } from './my-addresses.component';


const routes: Routes = [
  { path: '', component: MyAddressesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAddressesRoutingModule { }
