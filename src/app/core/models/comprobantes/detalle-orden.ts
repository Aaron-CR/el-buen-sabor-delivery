import { Base } from '../base';
import { ArticuloInsumo  } from '../articulos/articulo-insumo';
import { ArticuloManufacturado } from '../articulos/articulo-manufacturado';

export interface DetalleOrden extends Base {
  cantidad: number;
  precioTotal: number;
  insumo: ArticuloInsumo;
  articuloManufacturado: ArticuloManufacturado;
}
