import { Empleado } from "@src/contexts/taller/schemas/empleado.schema";

import { EmpleadoDto } from "../dtos/empleado.dto";

export const EmpleadoMapper = {
  toDto(empleado: Empleado): EmpleadoDto {
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

  toEntity(empleadoDto: EmpleadoDto): Empleado {
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
