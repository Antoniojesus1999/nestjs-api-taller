import { IsNotEmpty } from "class-validator";

export class DanyoDto {
  @IsNotEmpty()
  positionX: string;

  @IsNotEmpty()
  positionY: string;

  @IsNotEmpty()
  origWidth: string;

  @IsNotEmpty()
  origHeight: string;

  constructor(
    positionX: string,
    positionY: string,
    origWidth: string,
    origHeight: string,
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.origWidth = origWidth;
    this.origHeight = origHeight;
  }
}
