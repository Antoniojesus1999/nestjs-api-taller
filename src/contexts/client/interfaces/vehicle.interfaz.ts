import { IRepair } from "./repair.interfaz";

export interface IVehicle {
  model: string;
  brand: string;
  registration: string;
  repairs: [IRepair];
}
