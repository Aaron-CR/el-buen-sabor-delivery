import { Base } from '../base';

export interface Rubro extends Base {
  denominacion: string;
  rubroPadre: Rubro;
}
