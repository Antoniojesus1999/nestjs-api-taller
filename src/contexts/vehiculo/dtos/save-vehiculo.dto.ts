import { IsNotEmpty, IsString } from "class-validator";

import { IVehiculo } from "../interfaces/vehiculo.interfaz";

export class SaveVehiculoDto {
  @IsNotEmpty()
  @IsString()
  idCliente: string;

  @IsNotEmpty()
  vehiculo: IVehiculo;

  constructor(idCliente: string, vehiculo: IVehiculo) {
    this.idCliente = idCliente;
    this.vehiculo = vehiculo;
  }
}
