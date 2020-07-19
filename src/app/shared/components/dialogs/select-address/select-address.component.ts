import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { BehaviorSubject } from 'rxjs';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {

  private addressSubject = new BehaviorSubject<DireccionDelivery[]>([]);
  public address$ = this.addressSubject.asObservable();
  public direccion: DireccionDelivery;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    public cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.customerService.getDirecciones(this.authService.uid)
      .subscribe((response) => this.addressSubject.next(response));
  }

  onSelect() {
    this.cartService.shoppingCartForm.patchValue({ direccionEntrega: this.direccion });
  }

  compareWith(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
