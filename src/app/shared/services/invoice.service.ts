import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Factura } from 'src/app/core/models/comprobantes/factura';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ApiService<Factura> {

  protected endpoint = 'http://localhost:8080/api/v1/comprobantes/facturas';

  getInvoice(ordenId: number): Observable<Factura> {
    return this.httpClient.get<Factura>(`${this.endpoint}/orden/${ordenId}`)
      .pipe(catchError(error => this.handleError(error)));
  }

}
