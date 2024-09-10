import { IDanyo } from "./danyo.interfaz";
import { ITrabajo } from "./trabajo.interfaz";

export interface IReparacion {
  id: string;
  fecEntrada: Date;
  combustible: string;
  kilometros: string;
  seguro: string;
  chasis: string;
  trabajos: ITrabajo[];
  danyos: IDanyo[];
  taller: string;
  cliente: string;
  vehiculo: string;
  createdAt: Date;
  updatedAt: Date;
}
