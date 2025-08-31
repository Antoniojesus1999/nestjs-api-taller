import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

import { ColorVehiculoDto } from "@src/contexts/color-vehiculo/dtos/color-vehiculo.dto";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

export class VehiculoDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  matricula: string;

  @IsNotEmpty()
  marca: string;

  @IsNotEmpty()
  modelo: string;

  @IsNotEmpty()
  color: ColorVehiculoDto;

  @IsOptional()
  combustible: string;

  @IsOptional()
  reparaciones: [ReparacionDto];

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(
    id: string,
    matricula: string,
    marca: string,
    modelo: string,
    color: ColorVehiculoDto,
    combustible: string,
    reparaciones: [ReparacionDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.combustible = combustible;
    this.reparaciones = reparaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
