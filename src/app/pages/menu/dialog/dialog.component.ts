import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/shared/shopping-cart/shopping-cart.service';
import { DetalleOrden } from 'src/app/core/models/comprobantes/detalle-orden';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleReceta } from 'src/app/core/models/articulos/detalle-receta';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public localData: any;
  public cantidad = '1';

  get time() {
    return this.data.tiempoEstimadoCocina ? `${this.data.tiempoEstimadoCocina} - ${this.data.tiempoEstimadoCocina + 5} min` : '2 - 5 min';
  }

  get categoria() {
    return this.data.categoria ? `${this.data.categoria.denominacion}` : `${this.data.rubro.denominacion}`;
  }

  get esInsumo() {
    return this.localData.esInsumo !== undefined;
  }

  get outOfStock() {
    if (this.esInsumo) {
      return this.localData.stockActual <= 0;
    } else {
      return this.localData.detallesReceta.some((detalle: DetalleReceta) => detalle.insumo.stockActual <= 0);
    }
  }

  get ingredientes() {
    if (this.localData.detallesReceta) {
      return this.localData.detallesReceta.reduce((detalle, { insumo, oculto }) => !oculto
        ? detalle.concat(' • ', insumo.denominacion)
        : detalle, '');
    }
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: ShoppingCartService,
    protected snackBar: MatSnackBar
  ) {
    this.localData = { ...data };
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
