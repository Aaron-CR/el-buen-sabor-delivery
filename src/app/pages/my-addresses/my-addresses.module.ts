import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAddressesRoutingModule } from './my-addresses-routing.module';
import { MyAddressesComponent } from './my-addresses.component';
import { AddressCardComponent } from './address-card/address-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MyAddressesComponent, AddressCardComponent],
  imports: [
    CommonModule,
    MyAddressesRoutingModule,
    SharedModule
  ]
})
export class MyAddressesModule { }
