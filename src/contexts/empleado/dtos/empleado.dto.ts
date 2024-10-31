import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class EmpleadoDto {
  @IsOptional()
  id!: string;

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

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    photoUrl: string,
    displayName: string,
    provider: string,
    uid: string,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.photoUrl = photoUrl;
    this.displayName = displayName;
    this.provider = provider;
    this.uid = uid;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
