import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

import { ClienteDto } from "@src/contexts/cliente/dtos/cliente.dto";
import { TallerDto } from "@src/contexts/taller/dtos/taller.dto";
import { VehiculoDto } from "@src/contexts/vehiculo/dtos/vehiculo.dto";

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
  taller: TallerDto;

  @IsNotEmpty()
  cliente: ClienteDto;

  @IsNotEmpty()
  vehiculo: VehiculoDto;

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
    taller: TallerDto,
    cliente: ClienteDto,
    vehiculo: VehiculoDto,
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
