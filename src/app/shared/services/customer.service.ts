import { Cliente } from './../../core/models/usuarios/cliente';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DireccionDelivery } from 'src/app/core/models/direccion/direccion-delivery';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ApiService<Cliente> {

  protected endpoint = 'http://localhost:8080/api/v1/usuarios/clientes';

  findByUid(uid: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.endpoint}/current/${uid}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  create(object: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.endpoint, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  update(object: Cliente, id: number): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.endpoint}/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  getDirecciones(clienteUid: string): Observable<DireccionDelivery[]> {
    return this.httpClient.get<DireccionDelivery[]>(`${this.endpoint}/direcciones`, {
      params: new HttpParams()
        .set('clienteUid', clienteUid)
    }).pipe(catchError(error => this.handleError(error)));
  }

  addDireccion(direccion: DireccionDelivery, clienteUid: string): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.endpoint}/direccion/add`, direccion, {
      params: new HttpParams()
        .set('clienteUid', clienteUid)
    }).pipe(catchError(error => this.handleError(error)));
  }

  removeDireccion(direccionId: number, clienteUid: string): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.endpoint}/direccion/remove`, {
      params: new HttpParams()
        .set('clienteUid', clienteUid)
        .set('direccionId', direccionId.toString())
    }).pipe(catchError(error => this.handleError(error)));
  }

}
