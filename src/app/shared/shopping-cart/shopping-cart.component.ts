import { Component, OnInit } from '@angular/core';
import { DialogService } from '../components/dialogs/dialog.service';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  get disabled(): boolean {
    return this.cartService.delivery.value && this.cartService.direccionEntrega.value === null;
  }

  constructor(
    private dialogService: DialogService,
    public cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  selectAddress() {
    this.dialogService.selectAddress();
  }

  continue() {
    this.dialogService.billingDetails();
  }

  cancelOrder() {
    this.cartService.resetOrder();
  }

  openMap() {
    this.dialogService.ourLocation();
  }

}
