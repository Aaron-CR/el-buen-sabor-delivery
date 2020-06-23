import { Base } from './base';
import { DireccionLegal } from './direccion/direccion-legal';

export interface DatosEmpresa extends Base {
  email: string;
  propietario: string;
  rezonSocial: string;
  telefono: number;
  direccion: DireccionLegal;
}
