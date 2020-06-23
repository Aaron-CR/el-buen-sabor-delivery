import { Base } from '../base';
import { Provincia } from './provincia';

export interface Localidad extends Base {
  nombre: string;
  provincia: Provincia;
}
