import { ColorVehiculoDto } from "../dtos/color-vehiculo.dto";
import { ColorVehiculo } from "../schemas/color-vehiculo.schema";

export const ColorVehiculoMapper = {
  toDto(colorVehiculo: ColorVehiculo): ColorVehiculoDto {
    return new ColorVehiculoDto(
      colorVehiculo._id as string,
      colorVehiculo.nombre,
      colorVehiculo.colorR,
      colorVehiculo.colorG,
      colorVehiculo.colorB,
      colorVehiculo.createdAt,
      colorVehiculo.updatedAt,
    );
  },

  toEntity(colorVehiculoDto: ColorVehiculoDto): ColorVehiculo {
    return new ColorVehiculo(
      colorVehiculoDto.nombre,
      colorVehiculoDto.colorR,
      colorVehiculoDto.colorG,
      colorVehiculoDto.colorB,
      colorVehiculoDto.createdAt,
      colorVehiculoDto.updatedAt,
    );
  },
};
