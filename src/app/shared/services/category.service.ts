import { Categoria } from './../../core/models/articulos/categoria';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppEndpoints } from 'src/app/app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService<Categoria> {

  protected endpoint = AppEndpoints.CATEGORIES;

}
