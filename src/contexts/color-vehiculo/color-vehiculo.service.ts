import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { ColorVehiculoDto } from "./dtos/color-vehiculo.dto";
import { IColorVehiculo } from "./interfaces/color.vehiculo.interfaz";
import { ColorVehiculoMapper } from "./mappers/color-vehiculo.mapper";
import { ColorVehiculo } from "./schemas/color-vehiculo.schema";

@Injectable()
export class ColorVehiculoService {
  constructor(
    @InjectModel(ColorVehiculo.name)
    private colorVehiculoModel: PaginateModel<ColorVehiculo>,
    private readonly logger: Logger,
  ) {}

  async saveColor(color: IColorVehiculo): Promise<ColorVehiculoDto> {
    const newColor = new this.colorVehiculoModel(color);
    return ColorVehiculoMapper.toDto(await newColor.save());
  }

  async deleteColor(idColor: string): Promise<void> {
    await this.colorVehiculoModel.findByIdAndDelete(idColor);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<ColorVehiculoDto[] | PaginateResult<ColorVehiculoDto>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por "createdAt" de forma descendente
    };

    try {
      this.logger.log("Buscando todos los colores sin paginar");
      const colores = await this.colorVehiculoModel
        .find()
        .sort({ nombre: "asc" })
        .collation({ locale: "es" })
        .exec();

      return colores.map(color => ColorVehiculoMapper.toDto(color));
    } catch (error) {
      this.logger.error(
        `Error al hacer la petición con los parámetros ${JSON.stringify(options)}`,
      );
      this.logger.error(error);
      throw error;
    }
  }
}
