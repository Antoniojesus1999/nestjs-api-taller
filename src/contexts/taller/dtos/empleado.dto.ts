import { IsEmail, IsNotEmpty } from "class-validator";

export class EmpleadoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
