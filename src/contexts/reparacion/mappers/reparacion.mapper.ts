import { DanyoDto } from "../dtos/danyo.dto";
import { ReparacionDto } from "../dtos/reparacion.dto";
import { TrabajoDto } from "../dtos/trabajo.dto";
import { Danyo } from "../schemas/danyo.schema";
import { Reparacion } from "../schemas/reparacion.schema";
import { Trabajo } from "../schemas/trabajo.schema";

export const ReparacionMapper = {
  toDto(reparacion: Reparacion): ReparacionDto {
    const trabajosDto =
      reparacion.trabajos?.map(trabajo => this.trabajoToDto(trabajo)) || [];
    const danyosDto =
      reparacion.danyos?.map(danyo => this.danyoToDto(danyo)) || [];

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
      reparacion.vehiculo,
      reparacion.createdAt,
      reparacion.updatedAt,
    );
  },

  toEntity(reparacionDto: ReparacionDto): Reparacion {
    const trabajos =
      reparacionDto.trabajos?.map(trabajoDto =>
        this.dtoToTrabajo(trabajoDto),
      ) || [];
    const danyos =
      reparacionDto.danyos?.map(danyoDto => this.dtoToDanyo(danyoDto)) || [];

    const reparacion = new Reparacion(
      reparacionDto._id ?? 0,
      reparacionDto.fecEntrada,
      reparacionDto.combustible,
      reparacionDto.kilometros,
      reparacionDto.seguro,
      reparacionDto.chasis,
      trabajos,
      danyos,
      reparacionDto.taller,
      reparacionDto.cliente,
      reparacionDto.vehiculo,
      reparacionDto.createdAt,
      reparacionDto.updatedAt,
    );

    return reparacion;
  },

  trabajoToDto(trabajo: Trabajo): TrabajoDto {
    return new TrabajoDto(trabajo.descripcion);
  },

  dtoToTrabajo(trabajoDto: TrabajoDto): Trabajo {
    return new Trabajo(trabajoDto.descripcion);
  },

  danyoToDto(danyo: Danyo): DanyoDto {
    return new DanyoDto(
      danyo.positionX,
      danyo.positionY,
      danyo.origWidth,
      danyo.origHeight,
    );
  },

  dtoToDanyo(danyoDto: DanyoDto): Danyo {
    return new Danyo(
      danyoDto.positionX,
      danyoDto.positionY,
      danyoDto.origWidth,
      danyoDto.origHeight,
    );
  },
};
