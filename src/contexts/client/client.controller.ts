import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { ClientService } from "./client.service";
import { IClient } from "./interfaces/client.interfaz";
@Controller("client")
export class ClientController {
  constructor(private clientService: ClientService) {}

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
  @Get("repair-all")
  async findAllRepair(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.clientService.findAllRepairs(page, limit);
  }
}
