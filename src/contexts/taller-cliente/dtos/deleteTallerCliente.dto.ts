import { IsNotEmpty, IsString } from "class-validator";

export class DeleteTallerClienteDto {
  @IsNotEmpty()
  @IsString()
  idTaller: string;

  @IsNotEmpty()
  @IsString()
  idCliente: string;

  constructor(idTaller: string, idCliente: string) {
    this.idTaller = idTaller;
    this.idCliente = idCliente;
  }
}
