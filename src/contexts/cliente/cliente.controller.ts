import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
} from "@nestjs/common";

import { ClienteService } from "./cliente.service";
import { ICliente } from "./interfaces/cliente.interfaz";
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
  async updateCliente(@Body() cliente: ICliente) {
    return this.clienteService.updateCliente(cliente.id, cliente);
  }

  @Delete("delete-cliente")
  async deleteCliente(@Query("idCliente") idCliente: string) {
    return this.clienteService.deleteCliente(idCliente);
  }

  @Get("find-all")
  async findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.clienteService.findAll(page, limit);
  }

  @Get("find-cliente-by-nif")
  async findClienteByNif(@Query("nif") nif: string) {
    return this.clienteService.findClienteByNif(nif);
  }

  @Get("find-reparaciones-by-cliente")
  async findReparacionesByCliente(@Query("idCliente") idCliente: string) {
    return this.clienteService.findReparacionesByClienteId(idCliente);
  }
}
