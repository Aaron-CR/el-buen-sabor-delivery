import { Orden } from './../../core/models/comprobantes/orden';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ApiService<Orden> {

  protected endpoint = 'http://localhost:8080/api/v1/comprobantes/ordenes';

  post(object: any, clienteUid: string): Observable<Orden> {
    console.log(`${this.endpoint}/save?clienteUid=${clienteUid}`);
    return this.httpClient.post<Orden>(`${this.endpoint}/save?clienteUid=${clienteUid}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  getPendingOrders(clienteUid: string): Observable<Orden[]> {
    return this.httpClient.get<Orden[]>(`${this.endpoint}/pendientes`, {
      params: new HttpParams()
        .set('clienteUid', clienteUid)
    }).pipe(catchError(error => this.handleError(error)));
  }

  getPastOrders(clienteUid: string): Observable<Orden[]> {
    return this.httpClient.get<Orden[]>(`${this.endpoint}/pasadas`, {
      params: new HttpParams()
        .set('clienteUid', clienteUid)
    }).pipe(catchError(error => this.handleError(error)));
  }

}
