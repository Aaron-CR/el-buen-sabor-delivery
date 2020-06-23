import { Base } from '../base';
import { HistorialStock } from './historial-stock';
import { Rubro } from './rubro';

export interface ArticuloInsumo extends Base {
  esInsumo: boolean;
  denominacion: string;
  descripcion: string;
  imagen: string;
  costo: number;
  precio: number;
  stockActual: number;
  stockMaximo: number;
  stockMinimo: number;
  unidadMedida: string;
  historialStock: Array<HistorialStock>;
  rubro: Rubro;
}
