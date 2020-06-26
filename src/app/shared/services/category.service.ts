import { Categoria } from './../../core/models/articulos/categoria';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService<Categoria> {

  protected endpoint = 'http://localhost:8080/api/v1/articulos/categorias';

}
