import { Base } from './../../core/models/base';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService<E extends Base> {

  protected endpoint: string;

  constructor(protected httpClient: HttpClient, protected snackBar: MatSnackBar) { }

  findAll(filter = '', page = 0, size = 8, sortBy = 'ultimaActualizacion', direction = 'desc'): Observable<object> {
    return this.httpClient.get(this.endpoint, {
      params: new HttpParams()
        .set('filter', filter)
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sortBy', sortBy)
        .set('direction', direction)
    }).pipe(catchError(error => this.handleError(error)));
  }

  findAllUnpaged(filter = ''): Observable<E[]> {
    return this.httpClient.get<E[]>(`${this.endpoint}/all`, {
      params: new HttpParams()
        .set('filter', filter)
    }).pipe(catchError(error => this.handleError(error)));
  }

  findById(id: number): Observable<E> {
    return this.httpClient.get<E>(`${this.endpoint}/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  create(object: object): Observable<object> {
    return this.httpClient.post(this.endpoint, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  update(object: object, id: number): Observable<object> {
    return this.httpClient.put(`${this.endpoint}/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(object: object, id: number): Observable<object> {
    return this.httpClient.delete(`${this.endpoint}/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  undo(object: object, id: number): Observable<object> {
    return this.httpClient.put(`${this.endpoint}/undoDelete/${id}`, object)
      .pipe(catchError(error => this.handleError(error)));
  }

  protected handleError(err) {
    const errorMessage = 'Ocurrió un error. intente nuevamente más tarde';
    this.snackBar.open(errorMessage, 'OK', { duration: 10000, panelClass: ['app-snackbar'] });
    return throwError(`${errorMessage} (${err.status})`);
  }
}
