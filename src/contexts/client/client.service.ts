import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel, PaginateOptions, PaginateResult } from "mongoose";

import { IClient } from "./interfaces/client.interfaz";
import { IRepairAndIdClient } from "./interfaces/repair.interfaz";
import { Client } from "./schemas/client.schema";

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectModel(Client.name) private clientModel: PaginateModel<Client>,
  ) {}

  async create(client: IClient): Promise<Client> {
    const newClient = new this.clientModel(client);
    return newClient.save();
  }

  async findAll(page: number, limit: number) {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" }, // Ordenar por el atributo "aaa" de tipo fecha de forma descendente
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
  async findAllRepairs(
    page: number,
    limit: number,
  ): Promise<PaginateResult<IRepairAndIdClient>> {
    const options: PaginateOptions = {
      page: page,
      limit: limit,
      sort: { createdAt: "desc" },
    };

    const clients: PaginateResult<Client> = await this.clientModel.paginate(
      {},
      options,
    );

    const allRepairs: IRepairAndIdClient[] = clients.docs.flatMap(client =>
      client.cars.flatMap(car =>
        car.repairs.map(repair => ({
          description: repair.description,
          date: repair.date,
          works: repair.works,
          idClient: String(client._id), // Convertir a string u otro tipo adecuado
        })),
      ),
    );

    const nuevoPaginateResult: PaginateResult<IRepairAndIdClient> = {
      ...clients,
      docs: allRepairs,
    };
    return nuevoPaginateResult;
  }
}
