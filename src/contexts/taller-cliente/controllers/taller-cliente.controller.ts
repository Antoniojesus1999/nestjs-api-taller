import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Query,
} from "@nestjs/common";

import { ObjectId } from "mongoose";
import { TallerClienteService } from "../services/taller-cliente.service";

@Controller("taller-cliente")
export class TallerClienteController {
  constructor(
    private tallerClienteService: TallerClienteService,
    private readonly logger: Logger,
  ) {}

  @Post("save-taller-cliente")
  async saveTallerCliente(@Body() idTaller: ObjectId, idCliente: ObjectId) {
    return this.tallerClienteService.saveTallerCliente(idTaller, idCliente);
  }

  @Delete("delete-taller-cliente")
  async deleteTallerCliente(@Body() idTaller: ObjectId, idCliente: ObjectId) {
    const tallerCliente = this.tallerClienteService.findOneByIds(idTaller, idCliente);

    return this.tallerClienteService.deleteTallerCliente(idTaller, idCliente);
  }

  @Get("get-clientes-by-taller")
  async getClientesByTaller(@Query("idTaller") idTaller: ObjectId) {
    return this.tallerClienteService.getClientesByTaller(idTaller);
  }

}
