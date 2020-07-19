import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public orderSubject = new BehaviorSubject<Orden>({
    formaPago: null,
    montoDescuento: null,
    total: 0,
    aclaraciones: null,
    detalles: [],
    delivery: false,
    direccionEntrega: null,
  });
  public order$ = this.orderSubject.asObservable();

  get subtotal() {
    return this.orderSubject.value.detalles.reduce((acc, val) => acc += val.precioTotal * val.cantidad, 0);
  }

  get montoDescuento() {
    const subtotal = this.subtotal;
    if (this.delivery) {
      return this.orderSubject.value.montoDescuento = null;
    } else {
      return this.orderSubject.value.montoDescuento = (subtotal * 10) / 100;
    }
  }

  get total(): number {
    const subtotal = this.subtotal;
    if (this.delivery) {
      return this.orderSubject.value.total = subtotal + 50;
    } else {
      return this.orderSubject.value.total = subtotal - this.montoDescuento;
    }
  }

  get delivery(): boolean {
    return this.orderSubject.value.delivery;
  }

  get direccionEntrega(): DireccionDelivery {
    return this.orderSubject.value.direccionEntrega;
  }

  get address() {
    return this.direccionEntrega
      ? `${this.direccionEntrega.calle} ${this.direccionEntrega.numero}, ${this.direccionEntrega.localidad.nombre}`
      : 'No seleccionaste ninguna dirección';
  }

  get itemsLength() {
    return this.orderSubject.value.detalles.reduce((acc, val) => acc += val.cantidad, 0);
  }

  constructor() { }

  addDetail(detail: DetalleOrden) {
    const detailExistInCart = this.findDetail(detail);
    if (!detailExistInCart) {
      this.orderSubject.value.detalles.push(detail);
      return;
    }
    detailExistInCart.cantidad += detail.cantidad;
  }

  removeOne(detail: DetalleOrden) {
    return detail.cantidad -= 1;
  }

  addOne(detail: DetalleOrden) {
    return detail.cantidad += 1;
  }

  removeDetail(detail: DetalleOrden) {
    this.orderSubject.value.detalles = this.orderSubject.value.detalles.filter(({ articuloManufacturado }) =>
      articuloManufacturado.id !== detail.articuloManufacturado.id);
  }

  toggleDelivery() {
    this.orderSubject.next({ ...this.orderSubject.value, delivery: !this.orderSubject.value.delivery });
  }

  cancelOrden() {
    this.orderSubject.next({
      formaPago: null,
      montoDescuento: null,
      total: 0,
      aclaraciones: null,
      detalles: [],
      delivery: false,
      direccionEntrega: null,
    });
  }

  findDetail(detail: DetalleOrden) {
    return this.findManufacturado(detail) || this.findInsumo(detail);
  }

  findManufacturado(detail: DetalleOrden) {
    if (detail.articuloManufacturado) {
      return this.orderSubject.value.detalles.find(({ articuloManufacturado }) =>
        articuloManufacturado.id === detail.articuloManufacturado.id);
    }
    return false;
  }

  findInsumo(detail: DetalleOrden) {
    if (detail.insumo) {
      return this.orderSubject.value.detalles.find(({ insumo }) =>
        insumo.id === detail.insumo.id);
    }
    return false;
  }

}
