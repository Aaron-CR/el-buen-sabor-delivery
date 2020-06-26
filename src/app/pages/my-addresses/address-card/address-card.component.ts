import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'src/app/shared/components/dialogs/dialog.service';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input()
  public data: DireccionDelivery;

  get address() {
    return `${this.data.calle} ${this.data.numero}, ${this.data.localidad.nombre}, ${this.data.localidad.provincia.nombre}`;
  }

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onFormAddress(object: any) {
    this.dialogService.formAddress(object);
  }

}
