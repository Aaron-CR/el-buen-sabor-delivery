import { Base } from '../base';
import { ArticuloInsumo } from './articulo-insumo';

export interface DetalleReceta extends Base {
  cantidad: number;
  insumo: ArticuloInsumo;
}
