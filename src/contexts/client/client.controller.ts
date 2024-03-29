import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common";

import { ClientService } from "./client.service";
import { IClient } from "./interfaces/client.interfaz";
@Controller("client")
export class ClientController {
  constructor(
    private clientService: ClientService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() client: IClient) {
    return this.clientService.create(client);
  }
  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.clientService.findAll(page, limit);
  }
  @Get("works")
  async findAllWorks(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    this.logger.log(
      `Ejecutando findAllRepairs page -> ${page} limit -> ${limit}`,
    );
    return this.clientService.findAllWorks(page, limit);
  }

  @Get("client-by-id-work")
  async findClientByIdWork(@Query("idWork") idWork: string) {
    return this.clientService.findClientByIdWork(idWork);
  }
}
