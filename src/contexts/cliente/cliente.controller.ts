import { Body, Controller, Delete, Get, Logger, Post, Put, Query } from "@nestjs/common";

import { ClienteService } from "./cliente.service";
import { ICliente} from "./interfaces/cliente.interfaz";
import { ObjectId } from "mongoose";
@Controller("cliente")
export class ClienteController {
  constructor(
    private clienteService: ClienteService,
    private readonly logger: Logger,
  ) {}

  @Post("save-cliente")
  async saveCliente(@Body() cliente: ICliente) {
    return this.clienteService.saveCliente(cliente);
  }

  @Put("update-cliente")
  async updateCliente(
    @Query("idCliente") idCliente: string,
    @Body() cliente: ICliente,
  ) {
    return this.clienteService.updateCliente(idCliente, cliente);
  }

  @Delete("delete-cliente")
  async deleteCliente(@Query("idCliente") idCliente: ObjectId) {
    return this.clienteService.deleteCliente(idCliente);
  }

  @Get("find-cliente-by-nif")
  async findClienteByNif(@Query("nif") nif: string) {
    return this.clienteService.findClieeteByNif(nif);
  }

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.clienteService.findAll(page, limit);
  }

}
