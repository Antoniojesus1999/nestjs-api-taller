import { IsNotEmpty } from "class-validator";

export class ModeloDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  slug: string;

  constructor(nombre: string, slug: string) {
    this.nombre = nombre;
    this.slug = slug;
  }
}
