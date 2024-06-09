/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { ClientDto } from "./dtos/client.dto";
import { IClient } from "./interfaces/client.interfaz";
import { IRepairAndIdClient as IWorkAndIdClient } from "./interfaces/repair.interfaz";
import { Client } from "./schemas/client.schema";

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectModel(Client.name) private clientModel: PaginateModel<Client>,
  ) {}

  async create(client: IClient): Promise<ClientDto> {
    const clientRepository = new this.clientModel(client);
    const newClient = await clientRepository.save();
    return this.mapToClientDto(newClient);
  }

  async update(id: string, client: IClient): Promise<ClientDto> {
    const updatedClient = await this.clientModel.findOneAndUpdate(
      { _id: id },
      client,
      {
        new: true,
      },
    );
    if (!updatedClient) {
      this.logger.log(
        `No hemos encontrado ese usuario por ese id al actualizar ${client.name} email ${client.email}`,
      );
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return this.mapToClientDto(updatedClient);
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
      const result = await this.clientModel.paginate({}, options);
      return result;
    } catch (error) {
      this.logger.log(
        `Error al hacer la petición con los parametros ${JSON.stringify(options)}`,
      );
      this.logger.log(error);
      return error;
    }
  }
  async findAllWorks(
    page: number,
    limit: number,
  ): Promise<PaginateResult<IWorkAndIdClient>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" },
    };

    const clients: PaginateResult<Client> = await this.clientModel.paginate(
      {},
      options,
    );

    const allRepairs: IWorkAndIdClient[] = clients.docs.flatMap(client =>
      client.vehicles.flatMap(vehicle =>
        vehicle.repairs.map(repair => ({
          description: repair.description,
          dateStart: repair.dateStart,
          works: repair.works,
          idClient: String(client._id), // Convertir a string u otro tipo adecuado
        })),
      ),
    );

    const nuevoPaginateResult: PaginateResult<IWorkAndIdClient> = {
      ...clients,
      docs: allRepairs,
    };
    return nuevoPaginateResult;
  }

  async findClientByIdWork(idWork: string): Promise<Client | null> {
    this.logger.log(`Se va a buscar el cliente con el parámetro ${idWork}`);

    try {
      const client = await this.clientModel
        .findOne({ "vehicles.repairs.works._id": idWork })
        .exec();
      return client;
    } catch (error) {
      this.logger.error(
        `Error al hacer la petición con el parámetro ${idWork}`,
      );
      this.logger.error(error);
      throw error;
    }
  }

  private mapToClientDto(client: Client): ClientDto {
    const { _id, name, nif, surName1, surName2, tlfn, email, vehicles, __v } =
      client;
    return {
      id: _id.toString(),
      name: name,
      nif: nif,
      surName1: surName1,
      surName2: surName2,
      tlfn: tlfn,
      email: email,
      vehicles: vehicles,
      __v: __v,
    };
  }
}
