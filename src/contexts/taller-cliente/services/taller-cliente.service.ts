import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId, PaginateModel } from "mongoose";
import { TallerCliente } from "../schemas/taller-cliente.schema";
import { Cliente } from "@src/contexts/cliente/schemas/cliente.schema";


@Injectable()
export class TallerClienteService {
  private readonly logger = new Logger(TallerClienteService.name);

  constructor(
    @InjectModel(TallerCliente.name) private tallerClienteModel: PaginateModel<TallerCliente>,
    @InjectModel(Cliente.name) private clienteModel: PaginateModel<Cliente>,
  ) {}

  async saveTallerCliente(idTaller: ObjectId, idCliente: ObjectId): Promise<TallerCliente> {
    const newTallerCliente = new this.tallerClienteModel(idCliente, idTaller);
    return newTallerCliente.save();
  }

  async deleteTallerCliente(idTaller: ObjectId, idCliente: ObjectId): Promise<void> {
    await this.tallerClienteModel.findOneAndDelete(idTaller, idCliente);
  }

  async findOneByIds(idTaller: ObjectId, idCliente: ObjectId): Promise<TallerCliente> {
    const tallerCliente = await this.tallerClienteModel.findOne({ idTaller, idCliente });

    if (!tallerCliente) {
      throw new NotFoundException("Cliente no encontrado");
    }

    return tallerCliente as TallerCliente;
  }

  async getClientesByTaller(idTaller: ObjectId): Promise<Cliente[]> {
    try {
      const tallerClientes = await this.tallerClienteModel.find({ idTaller });

      const clienteIds = tallerClientes.map((tallerCliente) => tallerCliente.idCliente);

      const clientes = await this.clienteModel.find({ _id: { $in: clienteIds } }).sort({ apellido_1: 1 }); 

      return clientes;
    } catch (error) {
      this.logger.error(`Error recuperando Clientes del Taller ${idTaller}`, error);
      throw error; // Re-throw the error for handling in the caller
    }
  }
  
}
