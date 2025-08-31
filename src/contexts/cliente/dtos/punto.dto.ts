import { IsNotEmpty } from "class-validator";

export class PuntoDto {
  @IsNotEmpty()
  dx: string;

  @IsNotEmpty()
  dy: string;

  @IsNotEmpty()
  pressure: string;

  @IsNotEmpty()
  type: string;

  constructor(dx: string, dy: string, pressure: string, type: string) {
    this.dx = dx;
    this.dy = dy;
    this.pressure = pressure;
    this.type = type;
  }
}
