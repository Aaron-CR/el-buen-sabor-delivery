import { Direccion } from './direccion';

export interface DireccionDelivery extends Direccion {
  aclaraciones: string;
  alias: string;
  latitud: number;
  longitud: number;
}
