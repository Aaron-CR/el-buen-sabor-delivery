import { Base } from '../base';

export interface HistorialStock extends Base {
  cantidad: number;
  fechaMovimiento: Date;
  operacion: boolean;
}
