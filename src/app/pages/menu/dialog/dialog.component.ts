import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticuloManufacturado } from 'src/app/core/models/articulos/articulo-manufacturado';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public localData: any;
  public cantidad = '1';

  get time() {
    return this.data.tiempoEstimadoCocina ? `${this.data.tiempoEstimadoCocina} - ${this.data.tiempoEstimadoCocina + 5} min` : '5 - 10 min';
  }

  get categoria() {
    return this.data.categoria ? `${this.data.categoria.denominacion}` : `${this.data.rubro.denominacion}`;
  }

  get esInsumo() {
    return this.localData.esInsumo !== undefined;
  }

  get ingredientes() {
    if (this.localData.detallesReceta) {
      return this.localData.detallesReceta.map((detalle) => {
        if (!detalle.oculto) {
          return `${detalle.insumo.denominacion} `;
        }
      });
    }
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private cartService: ShoppingCartService
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
  }

  addProductToCart() {
    const detail: DetalleOrden = {
      cantidad: Number(this.cantidad),
      precioTotal: this.localData.precio * Number(this.cantidad),
      articuloManufacturado: this.esInsumo ? null : this.localData,
      insumo: this.esInsumo ? this.localData : null
    };
    this.cartService.addDetail(detail);
  }

}
