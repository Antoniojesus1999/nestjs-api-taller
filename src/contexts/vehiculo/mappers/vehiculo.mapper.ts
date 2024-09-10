import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";
import { VehiculoDto } from "../dtos/vehiculo.dto";
import { Vehiculo } from "../schemas/vehiculo.schema";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";

export class VehiculoMapper {
  static toDto(vehiculo: Vehiculo): VehiculoDto {
    const reparacionesDto = vehiculo.reparaciones?.map(reparacion => ReparacionMapper.toDto(reparacion)) || [];

    return new VehiculoDto(
      vehiculo._id,
      vehiculo.matricula,
      vehiculo.marca,
      vehiculo.modelo,
      reparacionesDto as [ReparacionDto],
      vehiculo.createdAt,
      vehiculo.updatedAt,
    );
  }

  static toEntity(vehiculoDto: VehiculoDto): Vehiculo {

    const vehiculo = new Vehiculo(
        vehiculoDto.matricula,
        vehiculoDto.marca,
        vehiculoDto.modelo,
        vehiculoDto.createdAt,
        vehiculoDto.updatedAt,
      );
  
      if (vehiculoDto.id) {
        vehiculo._id = vehiculoDto.id;
      }
  
      return vehiculo;
  }

}
