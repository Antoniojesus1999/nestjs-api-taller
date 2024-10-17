import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EmpleadoDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photoUrl: string;

  @IsOptional()
  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  uid: string;

  constructor(
    email: string,
    photoUrl?: string,
    displayName?: string,
    provider?: string,
    uid?: string,
  ) {
    this.email = email;
    this.photoUrl = photoUrl ?? "";
    this.displayName = displayName ?? "";
    this.provider = provider ?? "";
    this.uid = uid ?? "";
  }
}
