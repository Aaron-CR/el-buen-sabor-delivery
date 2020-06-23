import { Base } from '../base';
import { Pais } from './pais';

export interface Provincia extends Base {
  nombre: string;
  pais: Pais;
}
