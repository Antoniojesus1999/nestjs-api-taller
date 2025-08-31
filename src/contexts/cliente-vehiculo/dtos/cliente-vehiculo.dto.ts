import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ClienteVehiculoDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  idCliente: string;

  @IsNotEmpty()
  @IsString()
  idVehiculo: string;

  constructor(id: string, idCliente: string, idVehiculo: string) {
    this.id = id;
    this.idCliente = idCliente;
    this.idVehiculo = idVehiculo;
  }
}
