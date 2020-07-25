import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {

  @Input() public data: DireccionDelivery;
  @Output() public update = new EventEmitter<DireccionDelivery>();
  @Output() public delete = new EventEmitter<object>();

  get address() {
    const { calle, numero, localidad } = this.data;
    return `${calle} ${numero}, ${localidad.nombre}, ${localidad.provincia.nombre}`;
  }

  constructor() { }

  onUpdate(item: DireccionDelivery) {
    this.update.emit(item);
  }

  onDelete(item: object) {
    this.delete.emit(item);
  }

}
