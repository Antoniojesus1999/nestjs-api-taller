import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class ColorVehiculoDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  colorR: string;

  @IsNotEmpty()
  colorG: string;

  @IsNotEmpty()
  colorB: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(
    id: string,
    nombre: string,
    colorR: string,
    colorG: string,
    colorB: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
