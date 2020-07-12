import { Component, OnInit, Input } from '@angular/core';
import { ArticuloManufacturado } from 'src/app/core/models/articulos/articulo-manufacturado';
import { ArticuloInsumo } from 'src/app/core/models/articulos/articulo-insumo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public data: any;

  get time() {
    return this.data.tiempoEstimadoCocina ? `${this.data.tiempoEstimadoCocina} - ${this.data.tiempoEstimadoCocina + 5} min` : '5 - 10 min';
  }

  get categoria() {
    return this.data.categoria ? `${this.data.categoria.denominacion}` : `${this.data.rubro.denominacion}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
