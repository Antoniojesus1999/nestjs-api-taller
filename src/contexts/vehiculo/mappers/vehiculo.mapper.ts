import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";

import { ColorVehDto } from "../dtos/color.veh.dto";
//import { ColorDto } from "../dtos/color.dto";
import { VehiculoDto } from "../dtos/vehiculo.dto";
import { ColorVeh } from "../schemas/color.veh..schema";
//import { Color } from "../schemas/color.schema";
import { Vehiculo } from "../schemas/vehiculo.schema";

export const VehiculoMapper = {
  toDto(vehiculo: Vehiculo): VehiculoDto {
    const colorVehDto = this.colorVehToDto(vehiculo.color);
    const reparacionesDto =
      vehiculo.reparaciones?.map(reparacion =>
        ReparacionMapper.toDto(reparacion),
      ) || [];

    return new VehiculoDto(
      vehiculo._id as string,
      vehiculo.matricula,
      vehiculo.marca,
      vehiculo.modelo,
      colorVehDto,
      reparacionesDto as [ReparacionDto],
      vehiculo.createdAt,
      vehiculo.updatedAt,
    );
  },

  toEntity(vehiculoDto: VehiculoDto): Vehiculo {
    const colorVeh = this.dtoToColorVeh(vehiculoDto.color);
    const vehiculo = new Vehiculo(
      vehiculoDto.matricula,
      vehiculoDto.marca,
      vehiculoDto.modelo,
      colorVeh,
      vehiculoDto.createdAt,
      vehiculoDto.updatedAt,
    );

    if (vehiculoDto.id) {
      vehiculo._id = vehiculoDto.id;
    }

    return vehiculo;
  },

  colorVehToDto(colorVeh: ColorVeh): ColorVehDto {
    return new ColorVehDto(
      colorVeh.nombre,
      colorVeh.colorR,
      colorVeh.colorG,
      colorVeh.colorB,
    );
  },

  dtoToColorVeh(colorVehDto: ColorVehDto): ColorVeh {
    return new ColorVeh(
      colorVehDto.nombre,
      colorVehDto.colorR,
      colorVehDto.colorG,
      colorVehDto.colorB,
    );
  },
};
