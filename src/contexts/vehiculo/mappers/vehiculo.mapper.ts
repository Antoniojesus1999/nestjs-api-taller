import { ColorVehiculoDto } from "@src/contexts/color-vehiculo/dtos/color-vehiculo.dto";
import { ColorVehiculoMapper } from "@src/contexts/color-vehiculo/mappers/color-vehiculo.mapper";
import { ColorVehiculo } from "@src/contexts/color-vehiculo/schemas/color-vehiculo.schema";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";

import { VehiculoDto } from "../dtos/vehiculo.dto";
import { Vehiculo } from "../schemas/vehiculo.schema";

export const VehiculoMapper = {
  toDto(vehiculo: Vehiculo): VehiculoDto {
    const colorVehiculoDto = vehiculo.color
      ? ColorVehiculoMapper.toDto(vehiculo.color)
      : undefined;

    const reparacionesDto =
      vehiculo.reparaciones?.map(reparacion =>
        ReparacionMapper.toDto(reparacion),
      ) || [];

    return new VehiculoDto(
      vehiculo._id as string,
      vehiculo.matricula,
      vehiculo.marca,
      vehiculo.modelo,
      (colorVehiculoDto as ColorVehiculoDto) || undefined,
      vehiculo.combustible,
      reparacionesDto as [ReparacionDto],
      vehiculo.createdAt,
      vehiculo.updatedAt,
    );
  },

  toEntity(vehiculoDto: VehiculoDto): Vehiculo {
    const colorVehiculo = vehiculoDto.color
      ? ColorVehiculoMapper.toEntity(vehiculoDto.color)
      : undefined;

    const vehiculo = new Vehiculo(
      vehiculoDto.matricula,
      vehiculoDto.marca,
      vehiculoDto.modelo,
      vehiculoDto.combustible,
      (colorVehiculo as ColorVehiculo) || undefined,
      vehiculoDto.createdAt,
      vehiculoDto.updatedAt,
    );

    if (vehiculoDto.id) {
      vehiculo._id = vehiculoDto.id;
    }

    return vehiculo;
  },
};
