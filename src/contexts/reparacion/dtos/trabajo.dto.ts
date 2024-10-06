import { IsNotEmpty } from "class-validator";

export class TrabajoDto {
  @IsNotEmpty()
  descripcion: string;

  constructor(descripcion: string) {
    this.descripcion = descripcion;
  }
}
