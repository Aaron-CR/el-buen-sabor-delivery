import { Observable } from 'rxjs';
import { Rubro } from './../../core/models/articulos/rubro';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class RubroService extends ApiService<Rubro> {

  protected endpoint = AppEndpoints.RUBROS;

  getRubrosBebidas(): Observable<Rubro[]> {
    return this.httpClient.get<Rubro[]>(`${this.endpoint}/bebidas`)
      .pipe(catchError(error => this.handleError(error)));
  }

}
