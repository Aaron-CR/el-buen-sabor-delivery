import { ArticuloManufacturado } from './../../core/models/articulos/articulo-manufacturado';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ManufacturedService extends ApiService<ArticuloManufacturado> {

  protected endpoint = AppEndpoints.MANUFACTURED;

  getAllPublic(filter = ''): Observable<ArticuloManufacturado[]> {
    return this.httpClient.get<ArticuloManufacturado[]>(`${this.endpoint}/allPublic`, {
      params: new HttpParams()
        .set('filter', filter)
    }).pipe(catchError(error => this.handleError(error)));
  }

}
