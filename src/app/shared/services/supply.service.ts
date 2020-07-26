import { ArticuloInsumo } from './../../core/models/articulos/articulo-insumo';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends ApiService<ArticuloInsumo> {

  protected endpoint = AppEndpoints.SUPPLY;

  getAllPublic(filter = ''): Observable<ArticuloInsumo[]> {
    return this.httpClient.get<ArticuloInsumo[]>(`${this.endpoint}/allPublic`, {
      params: new HttpParams()
        .set('filter', filter)
    }).pipe(catchError(error => this.handleError(error)));
  }

}
