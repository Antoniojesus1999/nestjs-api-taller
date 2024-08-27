import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class VehiculoDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  marca: string;

  @IsNotEmpty()
  modelo: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
  
  constructor(
    id        : string,
    matricula : string,
    marca     : string,
    modelo    : string,
    createdAt : Date,
    updatedAt : Date,

  ) {
    this.id        = id;
    this.matricula = matricula;
    this.marca     = marca;
    this.modelo    = modelo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}


