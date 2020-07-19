import { Component, OnInit } from '@angular/core';
import { DialogService } from '../components/dialogs/dialog.service';
import { ShoppingCartService } from './shopping-cart.service';
import { Orden } from 'src/app/core/models/comprobantes/orden';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public orden: Orden;

  constructor(
    private dialogService: DialogService,
    public cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.cartService.order$.subscribe(orden => this.orden = orden);
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
