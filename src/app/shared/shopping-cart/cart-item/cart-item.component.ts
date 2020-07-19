import { Component, Input } from '@angular/core';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input()
  public data: DetalleOrden;
  @Input()
  public index: number;

  get imagen() {
    return this.data.articuloManufacturado ? this.data.articuloManufacturado.imagen : this.data.insumo.imagen;
  }

  get denominacion() {
    return this.data.articuloManufacturado ? this.data.articuloManufacturado.denominacion : this.data.insumo.denominacion;
  }

  get precio() {
    return this.data.articuloManufacturado ? this.data.articuloManufacturado.precio : this.data.insumo.precio;
  }

  get cantidad() {
    return this.data.articuloManufacturado ? this.data.cantidad : this.data.cantidad;
  }

  constructor(private shoppingCartService: ShoppingCartService) { }

  addOne() {
    this.shoppingCartService.addOne(this.data);
  }

  removeOne() {
    this.shoppingCartService.removeOne(this.data, this.index);
  }

  removeItem() {
    this.shoppingCartService.removeDetail(this.index);
  }
}
