import { IReparacion } from "@src/contexts/reparacion/interfaces/reparacion.interfaz";
import { IEmpleado } from "./empleado.interfaz";

export interface ITaller {
  id: string;
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
  reparaciones: IReparacion[];
  createdAt : Date;
  updatedAt : Date;
}
