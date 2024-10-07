import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";

import { DanyoDto } from "./danyo.dto";
import { TrabajoDto } from "./trabajo.dto";

export class ReparacionDto {
  @IsOptional()
  _id: string;

  @IsNotEmpty()
  @IsDate()
  fecEntrada: Date;

  @IsOptional()
  combustible: string;

  @IsOptional()
  kilometros: string;

  @IsOptional()
  seguro: string;

  @IsOptional()
  chasis: string;

  @IsOptional()
  trabajos: [TrabajoDto];

  @IsOptional()
  danyos: [DanyoDto];

  @IsNotEmpty()
  taller: Types.ObjectId;

  @IsNotEmpty()
  cliente: Types.ObjectId;

  @IsNotEmpty()
  vehiculo: Types.ObjectId;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(
    _id: string,
    fecEntrada: Date,
    combustible: string,
    kilometros: string,
    seguro: string,
    chasis: string,
    trabajos: [TrabajoDto],
    danyos: [DanyoDto],
    taller: Types.ObjectId,
    cliente: Types.ObjectId,
    vehiculo: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = _id;
    this.fecEntrada = fecEntrada;
    this.combustible = combustible;
    this.kilometros = kilometros;
    this.seguro = seguro;
    this.chasis = chasis;
    this.trabajos = trabajos;
    this.danyos = danyos;
    this.taller = taller;
    this.vehiculo = vehiculo;
    this.cliente = cliente;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
