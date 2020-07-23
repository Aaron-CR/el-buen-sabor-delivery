import { ArticuloManufacturado } from './../../core/models/articulos/articulo-manufacturado';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManufacturedService extends ApiService<ArticuloManufacturado> {

  protected endpoint = 'http://localhost:8080/api/v1/articulos/manufacturados';

  getAllPublic(filter = ''): Observable<ArticuloManufacturado[]> {
    return this.httpClient.get<ArticuloManufacturado[]>(`${this.endpoint}/allPublic`, {
      params: new HttpParams()
        .set('filter', filter)
    }).pipe(catchError(error => this.handleError(error)));
  }

}
