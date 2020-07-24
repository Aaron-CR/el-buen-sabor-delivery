import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { DialogService } from '../dialog.service';


@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss'],
})
export class BillingDetailsComponent implements OnInit {

  public detailColumns: string[] = ['detalle', 'precio'];
  public formaPago = 'Efectivo';
  public aclaraciones: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialogService: DialogService,
    public cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.patchValues();
    this.orderService.post(this.cartService.shoppingCartForm.value, this.authService.uid).subscribe((res) => {
      if (res.id) {
        this.cartService.resetOrder();
        this.dialogService.orderSuccess(res);
      }
    });
  }

  patchValues() {
    this.cartService.shoppingCartForm.patchValue({ formaPago: this.formaPago });
    this.cartService.shoppingCartForm.patchValue({ aclaraciones: this.aclaraciones });
  }

}
