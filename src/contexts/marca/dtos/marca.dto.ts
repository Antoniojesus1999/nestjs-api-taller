import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

import { ModeloDto } from "./modelo.dto";

export class MarcaDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  slug: string;

  @IsOptional()
  modelos: [ModeloDto];

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(
    id: string,
    nombre: string,
    slug: string,
    modelos: [ModeloDto],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.slug = slug;
    this.modelos = modelos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
