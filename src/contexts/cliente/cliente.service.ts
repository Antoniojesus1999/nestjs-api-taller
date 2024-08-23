import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId, PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { ICliente} from "./interfaces/cliente.interfaz";
import { Cliente } from "./schemas/cliente.schema";

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(
    @InjectModel(Cliente.name) private clienteModel: PaginateModel<Cliente>,
  ) {}

  async saveCliente(cliente: ICliente): Promise<Cliente> {
    const newCliente = new this.clienteModel(cliente);
    return newCliente.save();
  }

  async updateCliente(id: string, cliente: ICliente): Promise<Cliente> {
    const updatedCliente = await this.clienteModel.findByIdAndUpdate(id, cliente, {
      new: true,
    });

    if (!updatedCliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return updatedCliente;
  }

  async deleteCliente(idCliente: ObjectId): Promise<void> {
    await this.clienteModel.findByIdAndDelete(idCliente);
  }

  async findClieeteByNif(nif: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findOne({ nif });

    if (!cliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return cliente as Cliente;
  }

  async findAll(page: number, limit: number) {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por el atributo "createdAt" de tipo fecha de forma descendente
    };
    this.logger.log(
      `Se va a buscar todos los clientes por con los parametros ${JSON.stringify(options)}`,
    );

    try {
      const result = await this.clienteModel.paginate({}, options);
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
