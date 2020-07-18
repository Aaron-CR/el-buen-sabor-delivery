import { Component, OnInit } from '@angular/core';
import { DialogService } from '../components/dialogs/dialog.service';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

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
    this.cartService.cancelOrden();
  }

  openMap() {
    console.log('open map');
  }

}
