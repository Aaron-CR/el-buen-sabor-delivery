import { Localidad } from './localidad';
import { Base } from '../base';

export interface Direccion extends Base {
  calle: string;
  departamento: string;
  localidad: Localidad;
  numero: number;
  piso: string;
}
