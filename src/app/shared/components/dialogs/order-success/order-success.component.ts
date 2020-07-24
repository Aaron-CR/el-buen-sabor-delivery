import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  public localData: Orden;
  public detailColumns: string[] = ['detalle', 'precio'];

  get address() {
    const { calle, numero, localidad } = this.localData.direccionEntrega;
    return `${calle} ${numero}, ${localidad.nombre}`;
  }

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Orden
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
  }

}
