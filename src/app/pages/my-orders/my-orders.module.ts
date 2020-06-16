import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MyOrdersComponent, OrderCardComponent],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    SharedModule
  ]
})
export class MyOrdersModule { }
