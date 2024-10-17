import { instanceToPlain, plainToClass } from "class-transformer";

import { EmpleadoDto } from "@src/contexts/taller/dtos/empleado.dto";
import { Empleado } from "@src/contexts/taller/schemas/empleado.schema";

export const EmpleadoMapper = {
  toDto(empleado: Empleado): EmpleadoDto {
    return plainToClass(EmpleadoDto, instanceToPlain(empleado));
  },

  toEntity(empleadoDto: EmpleadoDto): Empleado {
    const empleado = plainToClass(Empleado, instanceToPlain(empleadoDto));

    return empleado;
  },
};
