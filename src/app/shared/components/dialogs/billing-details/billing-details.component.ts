import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss'],
})
export class BillingDetailsComponent implements OnInit {

  public detailColumns: string[] = ['detalle', 'precio'];

  constructor(public cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
