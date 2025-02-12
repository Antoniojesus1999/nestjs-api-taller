import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, Types } from "mongoose";

import { ITallerCliente } from "../interfaces/tallerr-cliente.interfaz";
import { TallerCliente } from "../schemas/taller-cliente.schema";

@Injectable()
export class TallerClienteService {
  //private readonly logger = new Logger(TallerClienteService.name);
  constructor(
    @InjectModel(TallerCliente.name)
    private tallerClienteModel: PaginateModel<TallerCliente>,
    private readonly logger: Logger,
  ) {}

  async saveTallerCliente(
    tallerCliente: ITallerCliente,
  ): Promise<TallerCliente> {
    const newTallerCliente = new this.tallerClienteModel(tallerCliente);
    newTallerCliente.idTaller = new Types.ObjectId(tallerCliente.idTaller);
    return await newTallerCliente.save();
  }

  async deleteTallerCliente(
    idTaller: Types.ObjectId,
    idCliente: Types.ObjectId,
  ): Promise<void> {
    await this.tallerClienteModel.findOneAndDelete({ idTaller, idCliente });
  }

  async findOneByIds(
    idTaller: Types.ObjectId,
    idCliente: Types.ObjectId,
  ): Promise<TallerCliente> {
    const tallerCliente = await this.tallerClienteModel.findOne({
      idTaller,
      idCliente,
    });

    if (tallerCliente == undefined) {
      throw new NotFoundException("Taller Cliente no encontrado");
    }

    return tallerCliente as TallerCliente;
  }

  async getClientesByTaller(
    idTaller: Types.ObjectId,
  ): Promise<Types.ObjectId[]> {
    try {
      const tallerClientes = await this.tallerClienteModel.find({ idTaller });

      return tallerClientes.map(tallerCliente => tallerCliente.idCliente);
    } catch (error) {
      this.logger.error(
        `Error recuperando Clientes del Taller ${idTaller.toString()}`,
        error,
      );
      throw error; // Re-throw the error for handling in the caller
    }
  }
}
