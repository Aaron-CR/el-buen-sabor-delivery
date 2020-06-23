import { ArticuloInsumo } from './../../core/models/articulos/articulo-insumo';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends ApiService<ArticuloInsumo> {

  protected endpoint: 'http://localhost:8080/api/v1/articulos/insumos';
}
