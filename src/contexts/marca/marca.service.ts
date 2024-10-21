import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { MarcaDto } from "./dtos/marca.dto";
import { MarcaMapper } from "./mappers/marca.mapper";
import { Marca } from "./schemas/marca.schema";
import { Modelo } from "./schemas/modelo.schema";

@Injectable()
export class MarcaService {
  constructor(
    @InjectModel(Marca.name) private marcaModel: PaginateModel<Marca>,
    private readonly logger: Logger,
  ) {}

  async saveMarca(marca: MarcaDto): Promise<MarcaDto> {
    const newMarca = new this.marcaModel(marca);
    return MarcaMapper.toDto(await newMarca.save());
  }

  async addModeloToMarca(
    idMarca: string,
    nombre: string,
    slug: string,
  ): Promise<MarcaDto> {
    const marca = await this.marcaModel.findById(idMarca);

    if (!marca) {
      throw new NotFoundException("Marca no encontrada");
    }

    if (marca.modelos == undefined) {
      const modelos = [];
      modelos.push(new Modelo(nombre, slug));
      marca.modelos = modelos;
    } else {
      const modeloNew = new Modelo(nombre, slug);
      const checkNombreSlug = function (modelo: {
        nombre: string;
        slug: string;
      }) {
        return modelo.nombre === nombre && modelo.slug === slug;
      };

      if (marca.modelos.some(modelo => checkNombreSlug(modelo))) {
        throw new InternalServerErrorException(
          "El modelo ya está asociado a esta marca",
        );
      } else {
        marca.modelos.push(modeloNew);
      }
    }

    return MarcaMapper.toDto(await marca.save());
  }

  async deleteMarca(idMarca: string): Promise<void> {
    await this.marcaModel.findByIdAndDelete(idMarca);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<MarcaDto[] | PaginateResult<MarcaDto>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por "createdAt" de forma descendente
    };

    try {
      let result;

      if (page == 0) {
        this.logger.log("Buscando todos las marcas sin paginar");
        const marcas = await this.marcaModel
          .find()
          .sort({ nombre: "asc" })
          .collation({ locale: "es" })
          .exec();

        result = marcas.map(marca => MarcaMapper.toDto(marca));
      } else {
        this.logger.log(
          `Buscando las marcas paginadas page -> ${page}, limit ${limit}`,
        );
        const paginatedResult = await this.marcaModel.paginate({}, options);

        // Crear un nuevo objeto PaginateResult<TallerDto>
        const dtoPaginatedResult: PaginateResult<MarcaDto> = {
          ...paginatedResult,
          docs: paginatedResult.docs.map(marca => MarcaMapper.toDto(marca)),
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

  async filterMarcaByNombre(partialName: string): Promise<MarcaDto[]> {
    try {
      const marcas = await this.marcaModel
        .find({ nombre: { $regex: partialName, $options: "i" } }) // La opción "i" hace que la búsqueda sea case-insensitive
        .exec();

      return marcas.map(marca => MarcaMapper.toDto(marca));
    } catch (error) {
      this.logger.error(
        `Error al filtrar las marcas por nombre con la cadena: ${partialName}`,
      );
      this.logger.error(error);
      throw new InternalServerErrorException(
        "Error al filtrar las marcas por nombre",
      );
    }
  }
}
