import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticuloManufacturado } from 'src/app/core/models/articulos/articulo-manufacturado';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public localData: ArticuloManufacturado;
  public selected = '1';

  get time() {
    return this.data.tiempoEstimadoCocina ? `${this.data.tiempoEstimadoCocina} - ${this.data.tiempoEstimadoCocina + 5} min` : '5 - 10 min';
  }

  get categoria() {
    return this.data.categoria ? `${this.data.categoria.denominacion}` : `${this.data.rubro.denominacion}`;
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
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
  }

}
