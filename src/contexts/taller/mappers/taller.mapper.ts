import { Taller } from "../schemas/taller.schema";
import { TallerDto } from "../dtos/taller.dto";
import { Empleado } from "../schemas/empleado.schema";
import { EmpleadoDto } from "../dtos/empleado.dto";

export class TallerMapper {
  static toDto(taller: Taller): TallerDto {
    const empleadosDto = taller.empleados?.map(empleado => this.empleadoToDto(empleado)) || [];

    return new TallerDto(
      taller._id,
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
      taller.createdAt,
      taller.updatedAt,
      empleadosDto as [EmpleadoDto],
    );
  }

  static toEntity(tallerDto: TallerDto): Taller {
    const empleados = tallerDto.empleados?.map(empleadoDto => this.dtoToEmpleado(empleadoDto)) || [];

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
        tallerDto.createdAt,
        tallerDto.updatedAt,
        empleados as Empleado[]
      );
  
      if (tallerDto.id) {
        taller._id = tallerDto.id;
      }
  
      return taller;
  }

  static empleadoToDto(empleado: Empleado): EmpleadoDto {
    return new EmpleadoDto(empleado.email);
  }

  static dtoToEmpleado(empleadoDto: EmpleadoDto): Empleado {
    return new Empleado(empleadoDto.email);
  }
}
