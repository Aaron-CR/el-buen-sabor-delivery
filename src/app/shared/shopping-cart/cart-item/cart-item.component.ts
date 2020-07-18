import { Component, OnInit, Input } from '@angular/core';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input()
  public data: DetalleOrden;

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

  ngOnInit(): void {
  }

  removeOne() {
    this.shoppingCartService.removeOne(this.data);
  }

  addOne() {
    this.shoppingCartService.addOne(this.data);
  }

  removeItem() {
    this.shoppingCartService.removeDetail(this.data);
  }
}
