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
  apellido1: string;

  @IsOptional()
  apellido2: string;

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
    apellido1: string,
    apellido2: string,
    telefono: string,
    email: string,
    reparaciones: [ReparacionDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.nif = nif;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.telefono = telefono;
    this.email = email;
    this.reparaciones = reparaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
