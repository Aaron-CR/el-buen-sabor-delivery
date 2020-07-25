import { Component, Input } from '@angular/core';
import { Orden } from 'src/app/core/models/comprobantes/orden';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from 'src/app/shared/components/dialogs/invoice/invoice.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input()
  public data: Orden;

  get orderDetail() {
    return this.data.detalles.map((detalle) =>
      ` ${detalle.cantidad}x ${detalle.articuloManufacturado
        ? detalle.articuloManufacturado.denominacion
        : detalle.insumo.denominacion}`
    );
  }

  constructor(private dialog: MatDialog) { }

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
