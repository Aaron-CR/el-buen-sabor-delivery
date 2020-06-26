import { Cliente } from './../../core/models/usuarios/cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuarios/usuario';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<Cliente> {

  protected endpoint = 'http://localhost:8080/api/v1/usuarios';

  findByUid(uid: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.endpoint}/current/${uid}`)
      .pipe(catchError(error => this.handleError(error)));
  }

}
