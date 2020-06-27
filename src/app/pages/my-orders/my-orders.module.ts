import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PastTabComponent } from './past-tab/past-tab.component';
import { PendingTabComponent } from './pending-tab/pending-tab.component';


@NgModule({
  declarations: [MyOrdersComponent, OrderCardComponent, PastTabComponent, PendingTabComponent],
  imports: [
    CommonModule,
    MyOrdersRoutingModule,
    SharedModule
  ]
})
export class MyOrdersModule { }
