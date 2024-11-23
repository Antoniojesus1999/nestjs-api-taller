import { IsNotEmpty, IsString } from "class-validator";

import { ICliente } from "@src/contexts/cliente/interfaces/cliente.interfaz";

export class SaveClienteDto {
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
