import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmpleadoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  uid: string;

  constructor(
    email: string,
    photoUrl: string,
    displayName: string,
    provider: string,
    uid: string,
  ) {
    this.email = email;
    this.photoUrl = photoUrl;
    this.displayName = displayName;
    this.provider = provider;
    this.uid = uid;
  }
}
