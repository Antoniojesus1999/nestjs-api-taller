import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  Types,
} from "mongoose";

import { ReparacionDto } from "../reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "../reparacion/mappers/reparacion.mapper";
import { ClienteDto } from "./dtos/cliente.dto";
import { ICliente } from "./interfaces/cliente.interfaz";
import { ClienteMapper } from "./mappers/cliente.mapper";
import { Cliente } from "./schemas/cliente.schema";

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    @InjectModel(Cliente.name) private clienteModel: PaginateModel<Cliente>,
  ) {}

  async saveCliente(cliente: ICliente): Promise<ClienteDto> {
    const newCliente = new this.clienteModel(cliente);
    return ClienteMapper.toDto(await newCliente.save());
  }

  async updateCliente(id: string, cliente: ICliente): Promise<ClienteDto> {
    const updatedCliente = await this.clienteModel.findByIdAndUpdate(
      id,
      cliente,
      {
        new: true,
      },
    );

    if (!updatedCliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return ClienteMapper.toDto(updatedCliente);
  }

  async deleteCliente(idCliente: string): Promise<void> {
    await this.clienteModel.findByIdAndDelete(idCliente);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<ClienteDto[] | PaginateResult<ClienteDto>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por "createdAt" de forma descendente
    };

    try {
      let result;

      if (page == 0) {
        this.logger.log("Buscando todos los clientes sin paginar");
        const clientes = await this.clienteModel
          .find()
          .sort({ cif: "asc" })
          .collation({ locale: "es" })
          .exec();

        // Mapear los documentos Cliente a ClienteDto
        result = clientes.map(cliente => ClienteMapper.toDto(cliente));
      } else {
        this.logger.log(
          `Buscando los clientes paginados page -> ${page}, limit ${limit}`,
        );
        const paginatedResult = await this.clienteModel.paginate({}, options);

        // Crear un nuevo objeto PaginateResult<TallerDto>
        const dtoPaginatedResult: PaginateResult<ClienteDto> = {
          ...paginatedResult,
          docs: paginatedResult.docs.map(cliente =>
            ClienteMapper.toDto(cliente),
          ),
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

  async findClienteByNif(nif: string): Promise<ClienteDto> {
    const cliente = await this.clienteModel.findOne({ nif });

    if (!cliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return ClienteMapper.toDto(cliente);
  }

  async findClienteByIds(ids: Types.ObjectId[]): Promise<ClienteDto[]> {
    const clientes = await this.clienteModel.find({ _id: { $in: ids } });

    return clientes.map(cliente => ClienteMapper.toDto(cliente));
  }

  async findReparacionesByClienteId(
    idCliente: string,
  ): Promise<ReparacionDto[] | undefined> {
    // Buscar el cliente por su ID y poblar las reparaciones
    const cliente = await this.clienteModel
      .findById(idCliente)
      .populate("reparaciones")
      .exec();

    if (!cliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return cliente.reparaciones?.map(reparacion =>
      ReparacionMapper.toDto(reparacion),
    ); // Devolver las reparaciones asociadas al cliente
  }
}
