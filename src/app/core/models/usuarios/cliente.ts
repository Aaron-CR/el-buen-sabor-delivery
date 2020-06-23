import { Usuario } from './usuario';
import { DireccionDelivery } from '../direccion/direccion-delivery';

export interface Cliente extends Usuario {
  direccionesEnvio: Array<DireccionDelivery>;
}
