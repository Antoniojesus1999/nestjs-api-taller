import { IReparacion } from "@src/contexts/reparacion/interfaces/reparacion.interfaz";

export interface IVehiculo {
  id: string;
  matricula : string;
  marca     : string;
  modelo    : string;
  reparaciones : IReparacion[];
  createdAt : Date;
  updatedAt : Date;

}
