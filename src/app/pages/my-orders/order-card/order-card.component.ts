import { Component, OnInit, Input } from '@angular/core';
import { Orden } from 'src/app/core/models/comprobantes/orden';

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

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(status: string) {
    return status.replace(/\s+/g, '-');
  }

  getHiddenClass(status: string) {
    if (status === 'cancelado') {
      return 'hide';
    }
  }

}
