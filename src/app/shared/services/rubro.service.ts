import { Observable } from 'rxjs';
import { Rubro } from './../../core/models/articulos/rubro';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RubroService extends ApiService<Rubro> {

  protected endpoint = 'http://localhost:8080/api/v1/articulos/rubros';

  getRubrosBebidas(): Observable<Rubro[]> {
    return this.httpClient.get<Rubro[]>(`${this.endpoint}/bebidas`)
      .pipe(catchError(error => this.handleError(error)));
  }

}
