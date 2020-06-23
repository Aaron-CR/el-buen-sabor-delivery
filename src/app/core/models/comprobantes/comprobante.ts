import { Base } from '../base';
import { Estado } from './estado';
import { DetalleOrden } from './detalle-orden';

export interface Comprobante extends Base {
  fecha: Date;
  formaPago: string;
  montoDescuento: number;
  total: number;
  estado: Estado;
  detalles: Array<DetalleOrden>;
}
