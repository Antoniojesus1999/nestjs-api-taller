import { Controller, Delete, Get, Logger, Query } from "@nestjs/common";
import { Types } from "mongoose";

import { TallerClienteService } from "../services/taller-cliente.service";

@Controller("taller-cliente")
export class TallerClienteController {
  constructor(
    private tallerClienteService: TallerClienteService,
    private readonly logger: Logger,
  ) {}

  @Delete("delete-taller-cliente")
  async deleteTallerCliente(
    @Query("idTaller") idTaller: string,
    @Query("idCliente") idCliente: string,
  ) {
    return this.tallerClienteService.deleteTallerCliente(
      new Types.ObjectId(idTaller),
      new Types.ObjectId(idCliente),
    );
  }

  @Get("get-taller-cliente-by-ids")
  async findTallerClienteByIds(
    @Query("idTaller") idTaller: string,
    @Query("idCliente") idCliente: string,
  ) {
    return this.tallerClienteService.findOneByIds(
      new Types.ObjectId(idTaller),
      new Types.ObjectId(idCliente),
    );
  }
}
