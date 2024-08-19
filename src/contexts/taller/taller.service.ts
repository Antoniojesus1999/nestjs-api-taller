import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  Document,
  ObjectId,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
} from "mongoose";

import { TallerDto } from "./dtos/taller.dto";
import { Taller } from "./schemas/taller.schema";

@Injectable()
export class TallerService {
  private readonly logger = new Logger(TallerService.name);

  constructor(
    @InjectModel(Taller.name) private tallerModel: PaginateModel<Taller>,
  ) {}

  async saveTaller(taller: TallerDto): Promise<Taller> {
    const newTaller = new this.tallerModel(taller);
    return await newTaller.save();
  }

  async updateTaller(id: string, taller: TallerDto): Promise<Taller> {
    const updatedTaller = await this.tallerModel.findByIdAndUpdate(id, taller, {
      new: true,
    });

    if (!updatedTaller) {
      throw new NotFoundException("Taller no encontrado");
    }

    return updatedTaller;
  }

  async deleteTaller(idTaller: ObjectId): Promise<void> {
    await this.tallerModel.findByIdAndDelete(idTaller);
  }

  async findTallerByCif(cif: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({ cif });

    if (!taller) {
      throw new NotFoundException("Taller no encontrado");
    }

    return taller as Taller;
  }

  async findByEmpleado(email: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({
      "empleados.email": email,
    });

    if (!taller) {
      throw new NotFoundException("Taller o empleado no encontrado");
    }

    return taller as Taller;
  }

  async findAll(page: number, limit: number) {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { cif: "asc" }, // Ordenar por el atributo "createdAt" de tipo fecha de forma descendente
    };
    let result:
      | Promise<(Document<Taller> & Taller & { _id: ObjectId })[]>
      | Promise<
          PaginateResult<
            Document<PaginateOptions, Taller> & Taller & { _id: ObjectId }
          >
        >;
    try {
      if (page == -1) {
        this.logger.log("Buscando todos los talleres sin paginar");
        result = this.tallerModel
          .find()
          .sort({ cif: "asc" })
          .collation({ locale: "es" });
      } else {
        this.logger.log(
          `Buscando los talleres paginados page -> ${page} page, limit ${limit}`,
        );
        result = this.tallerModel.paginate({}, options);
      }

      return result;
    } catch (error) {
      this.logger.log(
        `Error al hacer la petición con los parametros ${JSON.stringify(options)}`,
      );
      this.logger.log(error);
      return error;
    }
  }
}
