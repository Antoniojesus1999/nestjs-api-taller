import { IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { EmpleadoDto } from "./empleado.dto";
import { Reparacion } from "@src/contexts/reparacion/schemas/reparacion.schema";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

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
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  empleados: [EmpleadoDto];

  @IsOptional()
  reparaciones: [ReparacionDto];

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
    createdAt: Date,
    updatedAt: Date,
    empleados: [EmpleadoDto],
    reparaciones: [ReparacionDto]
  
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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.empleados = empleados;
    this.reparaciones = reparaciones
  }
}
