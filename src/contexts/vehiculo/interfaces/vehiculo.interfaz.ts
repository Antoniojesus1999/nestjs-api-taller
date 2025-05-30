import { IColorVehiculo } from "@src/contexts/color-vehiculo/interfaces/color.vehiculo.interfaz";
import { IReparacion } from "@src/contexts/reparacion/interfaces/reparacion.interfaz";

export interface IVehiculo {
  id: string;
  matricula: string;
  marca: string;
  combustible: string;
  modelo: string;
  color: IColorVehiculo;
  reparaciones: IReparacion[];
  createdAt: Date;
  updatedAt: Date;
}
