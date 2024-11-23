import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddEmpleadoDto {
  @IsString()
  idTaller: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(idTaller: string, email: string) {
    this.idTaller = idTaller;
    this.email = email;
  }
}
