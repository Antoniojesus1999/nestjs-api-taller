import { Reparacion } from "../schemas/reparacion.schema";
import { ReparacionDto } from "../dtos/reparacion.dto";
import { Trabajo } from "../schemas/trabajo.schema";
import { TrabajoDto } from "../dtos/trabajo.dto";
import { Danyo } from "../schemas/danyo.schema";
import { DanyoDto } from "../dtos/danyo.dto";

export class ReparacionMapper {
  static toDto(reparacion: Reparacion): ReparacionDto {
    const trabajosDto = reparacion.trabajos?.map(trabajo => this.trabajoToDto(trabajo)) || [];
    const danyosDto = reparacion.danyos?.map(danyo => this.danyoToDto(danyo)) || [];

    return new ReparacionDto(
      reparacion._id,
      reparacion.fecEntrada,
      reparacion.combustible,
      reparacion.kilometros,
      reparacion.seguro,
      reparacion.chasis,
      trabajosDto as [TrabajoDto],
      danyosDto as [DanyoDto],
      reparacion.taller,
      reparacion.cliente,
      reparacion.createdAt,
      reparacion.updatedAt
    );
  }

  static toEntity(reparacionDto: ReparacionDto): Reparacion {
    const trabajos = reparacionDto.trabajos?.map(trabajoDto => this.dtoToTrabajo(trabajoDto)) || [];
    const danyos = reparacionDto.danyos?.map(danyoDto => this.dtoToDanyo(danyoDto)) || [];

    const reparacion = new Reparacion(
        reparacionDto.fecEntrada,
        reparacionDto.combustible,
        reparacionDto.kilometros,
        reparacionDto.seguro,
        reparacionDto.chasis,
        trabajos as Trabajo[],
        danyos as Danyo[],
        reparacionDto.taller,
        reparacionDto.cliente,
        reparacionDto.createdAt,
        reparacionDto.updatedAt,
      );
  
      if (reparacionDto.id) {
        reparacion._id = reparacionDto.id;
      }
  
      return reparacion;
  }

  static trabajoToDto(trabajo: Trabajo): TrabajoDto {
    return new TrabajoDto(trabajo.descripcion);
  }

  static dtoToTrabajo(trabajoDto: TrabajoDto): Trabajo {
    return new Trabajo(trabajoDto.descripcion);
  }

  static danyoToDto(danyo: Danyo): DanyoDto {
    return new DanyoDto(danyo.positionX, danyo.positionY, danyo.origWidth, danyo.origHeight);
  }

  static dtoToDanyo(danyoDto: DanyoDto): Danyo {
    return new Danyo(danyoDto.positionX, danyoDto.positionY, danyoDto.origWidth, danyoDto.origHeight);
  }
}
