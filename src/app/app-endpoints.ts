import { environment } from 'src/environments/environment';

export class AppEndpoints {
  static API_URL = environment.API_URL;
  static ADDRESS_DELIVERY = AppEndpoints.API_URL + '/direcciones/delivery';
  static CATEGORIES = AppEndpoints.API_URL + '/articulos/categorias';
  static CUSTOMERS = AppEndpoints.API_URL + '/usuarios/clientes';
  static INVOICES = AppEndpoints.API_URL + '/comprobantes/facturas';
  static LOCATIONS = AppEndpoints.API_URL + '/direcciones/localidad';
  static LOCATIONS_ALL = AppEndpoints.LOCATIONS + '/all';
  static MANUFACTURED = AppEndpoints.API_URL + '/articulos/manufacturados';
  static ORDERS = AppEndpoints.API_URL + '/comprobantes/ordenes';
  static RUBROS = AppEndpoints.API_URL + '/articulos/rubros';
  static SUPPLY = AppEndpoints.API_URL + '/articulos/insumos';
  static USERS = AppEndpoints.API_URL + '/usuarios';
}
