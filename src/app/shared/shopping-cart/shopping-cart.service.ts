import { Injectable } from '@angular/core';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public shoppingCartForm: FormGroup;

  get subtotal() {
    return this.shoppingCartForm.value.detalles.reduce((acc, val) => acc += val.precioTotal * val.cantidad, 0);
  }

  get montoDescuento() {
    const subtotal = this.subtotal;
    if (this.delivery) {
      return this.shoppingCartForm.value.montoDescuento = null;
    } else {
      return this.shoppingCartForm.value.montoDescuento = (subtotal * 10) / 100;
    }
  }

  get total(): number {
    const subtotal = this.subtotal;
    if (this.delivery) {
      return this.shoppingCartForm.value.total = subtotal + 50;
    } else {
      return this.shoppingCartForm.value.total = subtotal - this.montoDescuento;
    }
  }

  get delivery(): boolean {
    return this.shoppingCartForm.value.delivery;
  }

  get detalles(): FormArray {
    return this.shoppingCartForm.get('detalles') as FormArray;
  }

  get direccionEntrega(): FormControl {
    return this.shoppingCartForm.get('direccionEntrega') as FormControl;
  }

  get address() {
    return this.direccionEntrega.value
      ? `${this.direccionEntrega.value.calle} ${this.direccionEntrega.value.numero}, ${this.direccionEntrega.value.localidad.nombre}`
      : 'No seleccionaste ninguna dirección';
  }

  get itemsLength() {
    return this.shoppingCartForm.value.detalles.reduce((acc, val) => acc += val.cantidad, 0);
  }

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  buildForm() {
    this.shoppingCartForm = this.formBuilder.group({
      total: [0],
      formaPago: ['efectivo'],
      aclaraciones: [null],
      montoDescuento: [null],
      delivery: [false],
      direccionEntrega: [null, [Validators.required]],
      detalles: this.formBuilder.array([])
    });
  }

  addDetail(detail: DetalleOrden) {
    const detailExistInCart = this.findDetail(detail);
    if (!detailExistInCart) {
      return this.shoppingCartForm.value.detalles.push(detail);
    }
    detailExistInCart.cantidad += detail.cantidad;
    if (detailExistInCart.cantidad > 15) {
      this.alert('Su orden necesitara confirmación telefónica');
    }
  }

  addOne(detail: DetalleOrden) {
    detail.cantidad += 1;
    if (detail.cantidad > 15) {
      this.alert('Su orden necesitara confirmación telefónica');
    }
  }

  removeOne(detail: DetalleOrden, index: number) {
    (detail.cantidad > 1)
      ? detail.cantidad -= 1
      : this.removeDetail(index);
  }

  removeDetail(index: number) {
    this.detalles.setValue = this.detalles.value.splice(index, 1);
  }

  alert(text: string) {
    this.snackBar.open(text, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
  }

  toggleDelivery() {
    this.shoppingCartForm.patchValue({ delivery: !this.shoppingCartForm.value.delivery });
  }

  cancelOrden() {
    this.shoppingCartForm.reset({
      total: 0,
      formaPago: 'efectivo',
      aclaraciones: null,
      montoDescuento: null,
      delivery: false,
      direccionEntrega: null,
      detalles: [],
    });
  }

  findDetail(detail: DetalleOrden) {
    return this.findManufacturado(detail) || this.findInsumo(detail);
  }

  findManufacturado(detail: DetalleOrden) {
    if (detail.articuloManufacturado) {
      return this.shoppingCartForm.value.detalles.find(({ articuloManufacturado }) =>
        articuloManufacturado.id === detail.articuloManufacturado.id);
    }
    return false;
  }

  findInsumo(detail: DetalleOrden) {
    if (detail.insumo) {
      return this.shoppingCartForm.value.detalles.find(({ insumo }) =>
        insumo.id === detail.insumo.id);
    }
    return false;
  }

  errorHandling = (control: string, error: string) => {
    return this.shoppingCartForm.controls[control].hasError(error);
  }

}
