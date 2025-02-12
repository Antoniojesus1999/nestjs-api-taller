import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { EmpleadoService } from "../empleado/empleado.service";
import { TallerDto } from "./dtos/taller.dto";
import { ITaller } from "./interfaces/taller.interfaz";
import { TallerMapper } from "./mappers/taller.mapper";
import { Empleado } from "./schemas/empleado.schema";
import { Taller } from "./schemas/taller.schema";

@Injectable()
export class TallerService {
  private readonly logger = new Logger(TallerService.name);
  constructor(
    @InjectModel(Taller.name) private tallerModel: PaginateModel<Taller>,
    private empleadoService: EmpleadoService,
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

  async addEmployeeToTaller(
    idTaller: string,
    email: string,
  ): Promise<TallerDto> {
    const taller = await this.tallerModel.findById(idTaller);

    if (!taller) {
      throw new NotFoundException("Taller no encontrado");
    }
    const empleado: Empleado =
      await this.empleadoService.findEmpleadoByEmail(email);

    if (taller.empleados == undefined) {
      const empleados = [];
      empleados.push(empleado);
      taller.empleados = empleados;
    } else {
      const existingEmpleado = taller.empleados.find(
        emp => emp.email === email,
      );
      if (existingEmpleado) {
        throw new InternalServerErrorException(
          "El empleado ya está dado de alta en este taller",
        );
      } else {
        taller.empleados.push(empleado);
      }
    }

    return TallerMapper.toDto(await taller.save());
  }

  async deleteTaller(idTaller: string): Promise<void> {
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

  async findAll(
    page: number,
    limit: number,
  ): Promise<TallerDto[] | PaginateResult<TallerDto>> {
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
        result = talleres.map(taller => TallerMapper.toDto(taller));
      } else {
        this.logger.log(
          `Buscando los talleres paginados page -> ${page}, limit ${limit}`,
        );
        const paginatedResult = await this.tallerModel.paginate({}, options);

        // Crear un nuevo objeto PaginateResult<TallerDto>
        const dtoPaginatedResult: PaginateResult<TallerDto> = {
          ...paginatedResult,
          docs: paginatedResult.docs.map(taller => TallerMapper.toDto(taller)),
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
}
