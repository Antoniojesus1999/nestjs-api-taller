import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class EmpleadoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(
    email: string    

  ) {
    this.email= email;
  }
}


