import { Comprobante } from './comprobante';
import { Orden } from './orden';
import { DatosEmpresa } from '../datos-empresa';
import { Empleado } from '../usuarios/empleado';

export interface Factura extends Comprobante {
  orden: Orden;
  datosEmpresa: DatosEmpresa;
  cajero: Empleado;
}
