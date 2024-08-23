import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class ClienteDto {
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

  constructor(
    nif       : string,
    nombre    : string,
    apellido_1: string,
    apellido_2: string,
    telefono  : string,
    email     : string,
  ) {
    this.nif        = nif;
    this.nombre     = nombre;
    this.apellido_1 = apellido_1;
    this.apellido_2 = apellido_2;
    this.telefono   = telefono;
    this.email      = email;
  }
}
