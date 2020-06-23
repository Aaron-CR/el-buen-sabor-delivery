import { Estado } from './../../core/models/comprobantes/estado';
import { Orden } from './../../core/models/comprobantes/orden';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService<Orden> {

  protected endpoint = 'http://localhost:8080/api/v1/comprobantes/ordenes';

  post(object: Orden, clienteUid: string): Observable<Orden> {
    return this.httpClient.post<Orden>(`${this.endpoint}/save`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  /* updateEstado(estado: Estado, ordenId: number): Observable<Orden> {
    return this.httpClient.put<Orden>(`${this.endpoint}/estado/${ordenId}`, estado)
      .pipe(catchError(error => this.handleError(error)));
  }

  addRepartidor(repartidor: Empleado, ordenId: number): Observable<Orden> {
    return this.httpClient.put<Orden>(`${this.endpoint}/repartidor/${ordenId}`, repartidor)
      .pipe(catchError(error => this.handleError(error)));
  } */
}
