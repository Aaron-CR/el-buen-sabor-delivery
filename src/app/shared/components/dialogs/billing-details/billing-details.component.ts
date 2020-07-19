import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';

export interface Details {
  detalle: string;
  precio: number;
}

const DETAILS_DATA: Details[] = [
  { detalle: '1 x Empanada de carne', precio: 250 },
  { detalle: '1 x Papas grandes', precio: 180 },
  { detalle: '1 x Coca Cola 500ml', precio: 50 }
];

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {

  public orden: Orden;
  public detailColumns: string[] = ['detalle', 'precio'];

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartService.order$.subscribe(orden => this.orden = orden);
  }

}
