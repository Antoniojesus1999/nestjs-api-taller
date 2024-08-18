import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, ObjectId, PaginateOptions } from "mongoose";

import { Taller } from "./schemas/taller.schema";
import { TallerDto } from "./dtos/taller.dto";

@Injectable()
export class TallerService {
  private readonly logger = new Logger(TallerService.name);

  // constructor(
  //   @InjectModel(Taller.name) private tallerModel: Model<Taller>,
  // ) {}

  constructor(
    @InjectModel(Taller.name) private tallerModel: PaginateModel<Taller>,
  ) {}

  async saveTaller(taller: TallerDto): Promise<Taller> {
    const newTaller = new this.tallerModel(taller);
    return await newTaller.save();
  }

  async updateTaller(id: string, taller: TallerDto): Promise<Taller> {
		const updatedTaller = await this.tallerModel.findByIdAndUpdate(id, taller, { new: true });

    if (!updatedTaller) {
      throw new NotFoundException('Taller no encontrado');
    }

    return updatedTaller;
	}

  async deleteTaller(idTaller: ObjectId): Promise<void> {
    await this.tallerModel.findByIdAndDelete(idTaller);
  }

  async findTallerByCif(cif: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({ cif });

    if (!taller) {
      throw new NotFoundException('Taller no encontrado');
    }

    return taller as Taller;
  }

  async findByEmpleado(email: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({
      'empleados.email': email
    });

    if (!taller) {
      throw new NotFoundException('Taller o empleado no encontrado');
    }

    return taller as Taller;
  }

  async findAll(page: number, limit: number) {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { nombre: "asc" }, // Ordenar por el atributo "createdAt" de tipo fecha de forma descendente
    };

    try {
      const result = await this.tallerModel.paginate({}, options);
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
