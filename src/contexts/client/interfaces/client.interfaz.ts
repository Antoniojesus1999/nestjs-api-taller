import { IVehicle } from "./vehicle.interfaz";

export interface IClient {
  name: string;
  nif: string;
  surName1: string;
  surName2: string;
  tlfn: string;
  email: string;
  cars: IVehicle[];
}
