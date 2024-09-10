import { ICliente } from "@src/contexts/cliente/interfaces/cliente.interfaz";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SaveTallerClienteDto {
  @IsNotEmpty()
  @IsString()
  idTaller: string;

  @IsNotEmpty()
  cliente: ICliente;

  constructor(idTaller: string, cliente: ICliente) {
    this.idTaller = idTaller;
    this.cliente = cliente;
  }
}
