import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
