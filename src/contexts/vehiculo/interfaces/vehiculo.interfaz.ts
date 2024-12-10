import { IReparacion } from "@src/contexts/reparacion/interfaces/reparacion.interfaz";

import { IColorVeh } from "./color.veh.interfaz";

export interface IVehiculo {
  id: string;
  matricula: string;
  marca: string;
  modelo: string;
  color: IColorVeh;
  reparaciones: IReparacion[];
  createdAt: Date;
  updatedAt: Date;
}
