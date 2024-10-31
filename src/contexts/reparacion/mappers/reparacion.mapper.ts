import { Types } from "mongoose";

import { ClienteMapper } from "@src/contexts/cliente/mappers/cliente.mapper";
import { Cliente } from "@src/contexts/cliente/schemas/cliente.schema";
import { VehiculoMapper } from "@src/contexts/vehiculo/mappers/vehiculo.mapper";
import { Vehiculo } from "@src/contexts/vehiculo/schemas/vehiculo.schema";

import { DanyoDto } from "../dtos/danyo.dto";
import { ReparacionDto } from "../dtos/reparacion.dto";
import { TrabajoDto } from "../dtos/trabajo.dto";
import { Danyo } from "../schemas/danyo.schema";
import { Reparacion } from "../schemas/reparacion.schema";
import { Trabajo } from "../schemas/trabajo.schema";

export const ReparacionMapper = {
  toDto(reparacion: Reparacion): ReparacionDto {
    const trabajosDto =
      reparacion.trabajos?.map(trabajo => this.trabajoToDto(trabajo)) || [];
    const danyosDto =
      reparacion.danyos?.map(danyo => this.danyoToDto(danyo)) || [];

    const clienteDto = ClienteMapper.toDto(
      reparacion.cliente as unknown as Cliente,
    );
    const vehiculoDto = VehiculoMapper.toDto(
      reparacion.vehiculo as unknown as Vehiculo,
    );

    return new ReparacionDto(
      reparacion._id as string,
      reparacion.fecEntrada,
      reparacion.combustible,
      reparacion.kilometros,
      reparacion.seguro,
      reparacion.chasis,
      trabajosDto as [TrabajoDto],
      danyosDto as [DanyoDto],
      reparacion.taller,
      clienteDto,
      vehiculoDto,
      reparacion.createdAt,
      reparacion.updatedAt,
    );
  },

  toEntity(reparacionDto: ReparacionDto): Reparacion {
    const trabajos =
      reparacionDto.trabajos?.map(trabajoDto =>
        this.dtoToTrabajo(trabajoDto),
      ) || [];
    const danyos =
      reparacionDto.danyos?.map(danyoDto => this.dtoToDanyo(danyoDto)) || [];

    const reparacion = new Reparacion(
      reparacionDto.fecEntrada,
      reparacionDto.combustible,
      reparacionDto.kilometros,
      reparacionDto.seguro,
      reparacionDto.chasis,
      trabajos,
      danyos,
      reparacionDto.taller,
      reparacionDto.cliente.id as unknown as Types.ObjectId,
      reparacionDto.vehiculo.id as unknown as Types.ObjectId,
      reparacionDto.createdAt,
      reparacionDto.updatedAt,
    );

    if (reparacionDto._id) {
      reparacion._id = reparacionDto._id;
    }

    return reparacion;
  },

  trabajoToDto(trabajo: Trabajo): TrabajoDto {
    return new TrabajoDto(trabajo.descripcion);
  },

  dtoToTrabajo(trabajoDto: TrabajoDto): Trabajo {
    return new Trabajo(trabajoDto.descripcion);
  },

  danyoToDto(danyo: Danyo): DanyoDto {
    return new DanyoDto(
      danyo.positionX,
      danyo.positionY,
      danyo.origWidth,
      danyo.origHeight,
    );
  },

  dtoToDanyo(danyoDto: DanyoDto): Danyo {
    return new Danyo(
      danyoDto.positionX,
      danyoDto.positionY,
      danyoDto.origWidth,
      danyoDto.origHeight,
    );
  },
};
