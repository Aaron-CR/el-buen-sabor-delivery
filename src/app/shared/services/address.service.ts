import { Injectable } from '@angular/core';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { ApiService } from './api.service';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiService<DireccionDelivery> {

  protected endpoint = AppEndpoints.ADDRESS_DELIVERY;

}
