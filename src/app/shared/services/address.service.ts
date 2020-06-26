import { Injectable } from '@angular/core';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiService<DireccionDelivery> {

  protected endpoint = 'http://localhost:8080/api/v1/direcciones/delivery';

}
