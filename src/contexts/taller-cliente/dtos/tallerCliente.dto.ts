import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TallerClienteDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  idTaller: string;

  @IsNotEmpty()
  @IsString()
  idCliente: string;
  
  constructor(
    id: string,
    idTaller: string, 
    idCliente: string
  ) 
  {
    this.id = id;
    this.idTaller = idTaller;
    this.idCliente = idCliente;
  }
}
