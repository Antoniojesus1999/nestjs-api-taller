import { IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

export class ClienteDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  nif: string;

  @IsOptional()
  nombre: string;

  @IsOptional()
  apellido_1: string;

  @IsOptional()
  apellido_2: string;

  @IsOptional()
  telefono: string;

  @IsOptional()
  @IsEmail()
  email: string;

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
    nif: string,
    nombre: string,
    apellido_1: string,
    apellido_2: string,
    telefono: string,
    email: string,
    reparaciones: [ReparacionDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.nif = nif;
    this.nombre = nombre;
    this.apellido_1 = apellido_1;
    this.apellido_2 = apellido_2;
    this.telefono = telefono;
    this.email = email;
    this.reparaciones = reparaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
