import { EmpleadoDto } from "@src/contexts/empleado/dtos/empleado.dto";
import { ReparacionDto } from "@src/contexts/reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "@src/contexts/reparacion/mappers/reparacion.mapper";

import { TallerDto } from "../dtos/taller.dto";
import { Empleado } from "../schemas/empleado.schema";
import { Taller } from "../schemas/taller.schema";

export const TallerMapper = {
  toDto(taller: Taller): TallerDto {
    const empleadosDto =
      taller.empleados?.map(empleado => this.empleadoToDto(empleado)) || [];
    const reparacionesDto =
      taller.reparaciones?.map(reparacion =>
        ReparacionMapper.toDto(reparacion),
      ) || [];

    return new TallerDto(
      taller._id as string,
      taller.cif,
      taller.nombre,
      taller.direccion,
      taller.cp,
      taller.municipio,
      taller.provincia,
      taller.riia,
      taller.telefono,
      taller.fax,
      taller.email,
      empleadosDto as [EmpleadoDto],
      reparacionesDto as [ReparacionDto],
      taller.createdAt,
      taller.updatedAt,
    );
  },

  toEntity(tallerDto: TallerDto): Taller {
    const empleados =
      tallerDto.empleados?.map(empleadoDto =>
        this.dtoToEmpleado(empleadoDto),
      ) || [];

    const taller = new Taller(
      tallerDto.cif,
      tallerDto.nombre,
      tallerDto.direccion,
      tallerDto.cp,
      tallerDto.municipio,
      tallerDto.provincia,
      tallerDto.riia,
      tallerDto.telefono,
      tallerDto.fax,
      tallerDto.email,
      empleados as [Empleado],
      tallerDto.createdAt,
      tallerDto.updatedAt,
    );

    if (tallerDto.id) {
      taller._id = tallerDto.id;
    }

    return taller;
  },

  empleadoToDto(empleado: Empleado): EmpleadoDto {
    return new EmpleadoDto(
      empleado._id as string,
      empleado.email,
      empleado.photoUrl,
      empleado.displayName,
      empleado.provider,
      empleado.uid,
      empleado.createdAt,
      empleado.updatedAt,
    );
  },

  dtoToEmpleado(empleadoDto: EmpleadoDto): Empleado {
    return new Empleado(
      empleadoDto.email,
      empleadoDto.photoUrl,
      empleadoDto.displayName,
      empleadoDto.provider,
      empleadoDto.uid,
      empleadoDto.createdAt,
      empleadoDto.updatedAt,
    );
  },
};
