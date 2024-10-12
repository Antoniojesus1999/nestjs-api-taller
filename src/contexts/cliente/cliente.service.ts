import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";

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
