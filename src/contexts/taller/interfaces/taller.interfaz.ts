import { IEmpleado } from "./empleado.interfaz";

export interface ITaller {
  cif: string;
  nombre: string;
  direccion: string;
  cp: string;
  municipio: string;
  provincia: string;
  riia: string;
  telefono: string;
  fax: string;
  email: string;
  empleados: IEmpleado[];
}
