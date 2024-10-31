import { IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

import { EmpleadoDto } from "../../empleado/dtos/empleado.dto";

export class TallerDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  cif: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  cp: string;

  @IsNotEmpty()
  municipio: string;

  @IsNotEmpty()
  provincia: string;

  @IsOptional()
  riia: string;

  @IsNotEmpty()
  telefono: string;

  @IsOptional()
  fax: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  empleados: [EmpleadoDto];

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
    cif: string,
    nombre: string,
    direccion: string,
    cp: string,
    municipio: string,
    provincia: string,
    riia: string,
    telefono: string,
    fax: string,
    email: string,
    empleados: [EmpleadoDto],
    reparaciones: [ReparacionDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.cif = cif;
    this.nombre = nombre;
    this.direccion = direccion;
    this.cp = cp;
    this.municipio = municipio;
    this.provincia = provincia;
    this.riia = riia;
    this.telefono = telefono;
    this.fax = fax;
    this.email = email;
    this.empleados = empleados;
    this.reparaciones = reparaciones;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
