import { IsNotEmpty, IsString } from "class-validator";

export class DeleteClienteVehiculoDto {
  @IsNotEmpty()
  @IsString()
  idCliente: string;

  @IsNotEmpty()
  @IsString()
  idVehiculo: string;

  constructor(idCliente: string, idVehiculo: string) {
    this.idCliente = idCliente;
    this.idVehiculo = idVehiculo;
  }
}
