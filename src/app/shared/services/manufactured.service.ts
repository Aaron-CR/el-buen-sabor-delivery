import { ArticuloManufacturado } from './../../core/models/articulos/articulo-manufacturado';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManufacturedService extends ApiService<ArticuloManufacturado> {

  protected endpoint = 'http://localhost:8080/api/v1/articulos/manufacturados';

}
