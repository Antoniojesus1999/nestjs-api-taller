import { VehiculoDto } from "../dtos/vehiculo.dto";
import { Vehiculo } from "../schemas/vehiculo.schema";

export class VehiculoMapper {
  static toDto(vehiculo: Vehiculo): VehiculoDto {
    
    return new VehiculoDto(
      vehiculo._id,
      vehiculo.matricula,
      vehiculo.marca,
      vehiculo.modelo,
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
