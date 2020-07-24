import { Component, OnInit, Input } from '@angular/core';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from 'src/app/shared/components/dialogs/invoice/invoice.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input()
  public data: Orden;

  get orderDetail() {
    let orderDetail = '';
    this.data.detalles.map((detalle) => {
      orderDetail += `${detalle.cantidad}x ${detalle.articuloManufacturado ? detalle.articuloManufacturado.denominacion : detalle.insumo.denominacion},  `;
    });
    return orderDetail;
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getStatusClass(status: string) {
    return status.replace(/\s+/g, '-');
  }

  getHiddenClass() {
    if (this.data.estado.denominacion !== 'entregado') {
      return 'hide';
    }
  }

  openDialog() {
    this.dialog.open(InvoiceComponent, {
      panelClass: 'app-dialog',
      data: this.data.id
    });
  }

}
