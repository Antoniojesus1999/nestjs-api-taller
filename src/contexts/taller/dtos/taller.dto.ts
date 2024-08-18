import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { EmpleadoDto } from "./empleado.dto";

export class TallerDto {
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

  constructor(
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
  ) {
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
  }
}
