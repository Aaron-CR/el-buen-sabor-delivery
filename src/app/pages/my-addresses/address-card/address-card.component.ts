import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input() public data: DireccionDelivery;
  @Output() public update = new EventEmitter<DireccionDelivery>();
  @Output() public delete = new EventEmitter<object>();

  get address() {
    return `${this.data.calle} ${this.data.numero}, ${this.data.localidad.nombre}, ${this.data.localidad.provincia.nombre}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(item: DireccionDelivery) {
    this.update.emit(item);
  }

  onDelete(item: object) {
    this.delete.emit(item);
  }

}
