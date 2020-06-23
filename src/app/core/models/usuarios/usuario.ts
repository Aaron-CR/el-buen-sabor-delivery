import { Base } from '../base';
import { Rol } from './rol';

export interface Usuario extends Base {
  fechaAlta: Date;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  uid: string;
  rol: Rol;
}
