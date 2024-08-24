import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ObjectId,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
} from "mongoose";

import { TallerDto } from "./dtos/taller.dto";
import { Taller } from "./schemas/taller.schema";
import { IEmpleado } from "./interfaces/empleado.interfaz";
import { ITaller } from "./interfaces/taller.interfaz";
import { TallerMapper } from "./mappers/taller.mapper";
import { ReparacionDto } from "../reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "../reparacion/mappers/reparacion.mapper";

@Injectable()
export class TallerService {
  private readonly logger = new Logger(TallerService.name);

  constructor(
    @InjectModel(Taller.name) private tallerModel: PaginateModel<Taller>,
  ) {}

  async saveTaller(taller: ITaller): Promise<TallerDto> {
    const newTaller = new this.tallerModel(taller);
    return TallerMapper.toDto(await newTaller.save());
  }

  async updateTaller(id: string, taller: ITaller): Promise<TallerDto> {
    const updatedTaller = await this.tallerModel.findByIdAndUpdate(id, taller, {
      new: true,
    });

    if (!updatedTaller) {
      throw new NotFoundException("Taller no encontrado");
    }

    return TallerMapper.toDto(updatedTaller);
  }

  async addEmployeeToTaller(idTaller: string, empleado: IEmpleado): Promise<TallerDto> {
    const taller = await this.tallerModel.findById(idTaller);

    if (!taller) {
      throw new NotFoundException("Taller no encontrado");
    }

    taller.empleados.push(empleado); // Add the new employee to the 'empleados' array

    return TallerMapper.toDto(await taller.save());
  }

  async deleteTaller(idTaller: ObjectId): Promise<void> {
    await this.tallerModel.findByIdAndDelete(idTaller);
  }

  async findTallerByCif(cif: string): Promise<TallerDto> {
    const taller = await this.tallerModel.findOne({ cif });

    if (!taller) {
      throw new NotFoundException("Taller no encontrado");
    }

    return TallerMapper.toDto(taller);
  }

  async findByEmpleado(email: string): Promise<TallerDto> {
    const taller = await this.tallerModel.findOne({
      "empleados.email": email,
    });

    if (!taller) {
      throw new NotFoundException("Taller o empleado no encontrado");
    }

    return TallerMapper.toDto(taller);
  }

  async findAll(page: number, limit: number): Promise<TallerDto[] | PaginateResult<TallerDto>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por "createdAt" de forma descendente
    };

    try {
      let result;

      if (page == 0) {
        this.logger.log("Buscando todos los talleres sin paginar");
        const talleres = await this.tallerModel
          .find()
          .sort({ cif: "asc" })
          .collation({ locale: "es" })
          .exec();

        // Mapear los documentos Taller a TallerDto
        result = talleres.map((taller) => TallerMapper.toDto(taller));
      } else {
        this.logger.log(`Buscando los talleres paginados page -> ${page}, limit ${limit}`);
        const paginatedResult = await this.tallerModel.paginate({}, options);

        // Crear un nuevo objeto PaginateResult<TallerDto>
        const dtoPaginatedResult: PaginateResult<TallerDto> = {
          ...paginatedResult,
          docs: paginatedResult.docs.map((taller) => TallerMapper.toDto(taller)),
        };

        result = dtoPaginatedResult;
      }

      return result;
    } catch (error) {
      this.logger.error(
        `Error al hacer la petición con los parámetros ${JSON.stringify(options)}`,
      );
      this.logger.error(error);
      throw error;
    }
  }

  async findReparacionesByTallerId(idTaller: string): Promise<ReparacionDto[] | undefined> {
    // Buscar el taller por su ID y poblar las reparaciones
    const taller = await this.tallerModel.findById(idTaller).populate('reparaciones').exec();

    if (!taller) {
      throw new NotFoundException("Taller no encontrado");
    }

    return taller.reparaciones?.map(reparacion => ReparacionMapper.toDto(reparacion)); // Devolver las reparaciones asociadas al taller
  }

}
