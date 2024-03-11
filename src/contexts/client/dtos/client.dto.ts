import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

import { Vehicle } from "../schemas/vehicle.schema";
export class ClientDto {
  @IsOptional()
  name: string;

  @IsNotEmpty()
  nif: string;

  @IsOptional()
  surName1: string;

  @IsOptional()
  surName2: string;

  @IsOptional()
  tlfn: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  cars: [Vehicle];
  constructor(
    name: string,
    nif: string,
    surName1: string,
    surName2: string,
    tlfn: string,
    email: string,
    cars: [Vehicle],
  ) {
    this.name = name;
    this.nif = nif;
    this.surName1 = surName1;
    this.surName2 = surName2;
    this.tlfn = tlfn;
    this.email = email;
    this.cars = cars;
  }
}
