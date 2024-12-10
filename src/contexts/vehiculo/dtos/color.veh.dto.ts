import { IsNotEmpty } from "class-validator";

export class ColorVehDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  colorR: string;

  @IsNotEmpty()
  colorG: string;

  @IsNotEmpty()
  colorB: string;

  constructor(nombre: string, colorR: string, colorG: string, colorB: string) {
    this.nombre = nombre;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
  }
}
