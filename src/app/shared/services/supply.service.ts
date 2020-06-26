import { ArticuloInsumo } from './../../core/models/articulos/articulo-insumo';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends ApiService<ArticuloInsumo> {

  protected endpoint: 'http://localhost:8080/api/v1/articulos/insumos';

  getBebidas(filter = '', page = 0, size = 8, sortBy = 'ultimaActualizacion', direction = 'desc'): Observable<object> {
    return this.httpClient.get(`${this.endpoint}/bebidas`, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('direction', direction)
    }).pipe(catchError(error => this.handleError(error)));
  }

}
