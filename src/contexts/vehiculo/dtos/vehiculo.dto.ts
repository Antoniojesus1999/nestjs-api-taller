import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

import { ColorVehDto } from "./color.veh.dto";

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
  color: ColorVehDto;

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
    color: ColorVehDto,
    reparaciones: [ReparacionDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.reparaciones = reparaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
