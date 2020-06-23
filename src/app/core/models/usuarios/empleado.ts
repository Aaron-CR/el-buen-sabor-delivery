import { Usuario } from './usuario';
import { DireccionLegal } from '../direccion/direccion-legal';

export interface Empleado extends Usuario {
  cuil: string;
  fechaDeIngreso: Date;
  direccion: DireccionLegal;
}
