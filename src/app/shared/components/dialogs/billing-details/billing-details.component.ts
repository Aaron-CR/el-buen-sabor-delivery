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
    public cartService: ShoppingCartService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

  patchValues() {
    this.cartService.shoppingCartForm.patchValue({ formaPago: this.formaPago });
    this.cartService.shoppingCartForm.patchValue({ aclaraciones: this.aclaraciones });
  }

  onSubmit(){
    let date: Date;
    this.orderService.getTime().subscribe( res => {
      date = new Date(res.date);
      this.validateTime(date, res.time);
    }
    );
  }

  validateTime(date: Date, time: string){
    switch (date.getDay()){
      case 0: case 6:
        if ((time > '20:00:00' && time < '23:59:59') || (time > '13:00:00' && time < '15:00:00')){
          this.postOrder();
        } else {
          this.dialogService.schedule();
        }
        break;
      default:
        if (time > '20:00:00' && time < '23:59:59'){
          this.postOrder();
        } else {
          this.dialogService.schedule();
        }
    }
  }

  postOrder() {
    this.patchValues();
    this.orderService.post(this.cartService.shoppingCartForm.value, this.authService.uid).subscribe((res) => {
      if (res.id) {
        this.cartService.resetOrder();
        this.dialogService.orderSuccess(res);
      }
    });
  }

}
