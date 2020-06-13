import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAddressesRoutingModule } from './my-addresses-routing.module';
import { MyAddressesComponent } from './my-addresses.component';


@NgModule({
  declarations: [MyAddressesComponent],
  imports: [
    CommonModule,
    MyAddressesRoutingModule
  ]
})
export class MyAddressesModule { }
