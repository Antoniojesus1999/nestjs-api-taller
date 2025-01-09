import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ObjectId,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  Types,
} from "mongoose";

import { ReparacionDto } from "./dtos/reparacion.dto";
import { IDanyo } from "./interfaces/danyo.interfaz";
import { IReparacion } from "./interfaces/reparacion.interfaz";
import { ITrabajo } from "./interfaces/trabajo.interfaz";
import { ReparacionMapper } from "./mappers/reparacion.mapper";
import { Reparacion } from "./schemas/reparacion.schema";
import { Trabajo } from "./schemas/trabajo.schema";

@Injectable()
export class ReparacionService {
  constructor(
    @InjectModel(Reparacion.name)
    private reparacionModel: PaginateModel<Reparacion>,
    private readonly logger: Logger,
  ) {}

  async saveReparacion(reparacion: IReparacion): Promise<ReparacionDto> {
    const newReparacion = new this.reparacionModel(reparacion);
    newReparacion.taller = new Types.ObjectId(reparacion.taller);
    newReparacion.cliente = new Types.ObjectId(reparacion.cliente);
    newReparacion.vehiculo = new Types.ObjectId(reparacion.vehiculo);

    return ReparacionMapper.toDto(await newReparacion.save());
  }

  async findTrabajoByReparacion(idReparacion: string): Promise<Trabajo[]> {
    const reparacion = await this.reparacionModel.findById(idReparacion);

    if (!reparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    return reparacion.trabajos;
  }
  async addListTrabajoToReparacion(
    idReparacion: string,
    listaTrabajos: string[],
  ) {
    try {
      const reparacion = await this.reparacionModel.findById(idReparacion);

      if (!reparacion) {
        throw new NotFoundException(
          "No se ha encontrado el ID de la reparación",
        );
      }

      const trabajos: Trabajo[] = listaTrabajos.map(descripcion => ({
        descripcion,
      }));

      reparacion.trabajos.push(...trabajos);

      const updatedReparacion = await reparacion.save();

      return ReparacionMapper.toDto(updatedReparacion);
    } catch (error) {
      this.logger.error(
        `Error al guardar trabajos en la reparación: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException(
        "Error al guardar trabajos en la reparación",
      );
    }
  }

  async updateReparacion(
    id: string,
    reparacion: IReparacion,
  ): Promise<ReparacionDto> {
    const updatedReparacion = await this.reparacionModel.findByIdAndUpdate(
      id,
      reparacion,
      {
        new: true,
      },
    );

    if (!updatedReparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    return ReparacionMapper.toDto(updatedReparacion);
  }

  async addTrabajoToReparacion(
    idReparacion: string,
    trabajo: ITrabajo,
  ): Promise<ReparacionDto> {
    const reparacion = await this.reparacionModel.findById(idReparacion);

    if (!reparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    reparacion.trabajos.push(trabajo); // Add the new employee to the 'empleados' array

    return ReparacionMapper.toDto(await reparacion.save());
  }

  async addDanyoToReparacion(
    idReparacion: string,
    danyo: IDanyo,
  ): Promise<ReparacionDto> {
    const reparacion = await this.reparacionModel.findById(idReparacion);

    if (!reparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    reparacion.danyos.push(danyo); // Add the new employee to the 'empleados' array

    return ReparacionMapper.toDto(await reparacion.save());
  }

  async deleteReparacion(idReparacion: ObjectId): Promise<void> {
    await this.reparacionModel.findByIdAndDelete(idReparacion);
  }

  async findReparacionesByTallerId(
    idTaller: string,
    page: number,
    limit: number,
  ): Promise<ReparacionDto[] | PaginateResult<ReparacionDto> | undefined> {
    try {
      if (page == 0) {
        const reparaciones = await this.reparacionModel
          .find({
            taller: idTaller,
          })
          .populate("taller")
          .populate("cliente")
          .populate("vehiculo");

        return reparaciones.map(reparacion =>
          ReparacionMapper.toDto(reparacion),
        );
      } else {
        const options: PaginateOptions = {
          page: page,
          limit: limit,
          sort: { createdAt: "desc" }, // Ordenar por "createdAt" de forma descendente
          populate: ["cliente", "vehiculo"],
        };

        const paginatedResult = await this.reparacionModel.paginate(
          { taller: new Types.ObjectId(idTaller) },
          options,
        );

        const dtoPaginatedResult: PaginateResult<ReparacionDto> = {
          ...paginatedResult,
          docs: paginatedResult.docs.map(reparacion =>
            ReparacionMapper.toDto(reparacion),
          ),
        };

        return dtoPaginatedResult;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
