import { IsNotEmpty } from "class-validator";

export class VehiculoDto {
  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  marca: string;

  @IsNotEmpty()
  modelo: string;

  constructor(
    matricula : string,
    marca     : string,
    modelo    : string

  ) {
    this.matricula = matricula;
    this.marca     = marca;
    this.modelo    = modelo;

  }
}


