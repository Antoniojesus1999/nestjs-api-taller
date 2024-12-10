import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";

import { IClienteVehiculo } from "../interfaces/cliente-vehiculo.interfaz";
import { ClienteVehiculo } from "../schemas/cliente-vehiculo.schema";

@Injectable()
export class ClienteVehiculoService {
  constructor(
    @InjectModel(ClienteVehiculo.name)
    private clienteVehiculoModel: PaginateModel<ClienteVehiculo>,
    private readonly logger: Logger,
  ) {}

  async saveClienteVehiculo(
    clienteVehiculo: IClienteVehiculo,
  ): Promise<ClienteVehiculo> {
    const newClienteVehiculo = new this.clienteVehiculoModel(clienteVehiculo);
    newClienteVehiculo.idCliente = new Types.ObjectId(
      clienteVehiculo.idCliente,
    );
    return await newClienteVehiculo.save();
  }

  async deleteClienteVehiculo(
    idCliente: Types.ObjectId,
    idVehiculo: Types.ObjectId,
  ): Promise<void> {
    await this.clienteVehiculoModel.findOneAndDelete({ idCliente, idVehiculo });
  }

  async findOneByIds(
    idCliente: Types.ObjectId,
    idVehiculo: Types.ObjectId,
  ): Promise<ClienteVehiculo> {
    const clienteVehiculo = await this.clienteVehiculoModel.findOne({
      idCliente,
      idVehiculo,
    });

    if (clienteVehiculo == undefined) {
      throw new NotFoundException("Cliente Vehiculo no encontrado");
    }

    return clienteVehiculo as ClienteVehiculo;
  }

  async getVehiculosByCliente(
    idCliente: Types.ObjectId,
  ): Promise<Types.ObjectId[]> {
    try {
      const clienteVehiculos = await this.clienteVehiculoModel.find({
        idCliente,
      });

      return clienteVehiculos.map(
        clienteVehiculo => clienteVehiculo.idVehiculo,
      );
    } catch (error) {
      this.logger.error(
        `Error recuperando Clientes del Taller ${idCliente.toString()}`,
        error,
      );
      throw error; // Re-throw the error for handling in the caller
    }
  }
}
