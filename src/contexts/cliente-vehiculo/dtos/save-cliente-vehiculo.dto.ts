import { IsNotEmpty, IsString } from "class-validator";

import { IVehiculo } from "@src/contexts/vehiculo/interfaces/vehiculo.interfaz";

export class SaveClienteVehiculoDto {
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
