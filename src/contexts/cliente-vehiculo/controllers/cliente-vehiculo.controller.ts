import { Controller, Delete, Get, Logger, Query } from "@nestjs/common";
import { Types } from "mongoose";

import { ClienteVehiculoService } from "../services/cliente-vehiculo.service";

@Controller("cliente-vehiculo")
export class ClienteVehiculoController {
  constructor(
    private clienteVehiculoService: ClienteVehiculoService,
    private readonly logger: Logger,
  ) {}

  @Delete("delete-cliente-vehiculo")
  async deleteClienteVehiculo(
    @Query("idCliente") idCliente: string,
    @Query("idVehiculo") idVehiculo: string,
  ) {
    return this.clienteVehiculoService.deleteClienteVehiculo(
      new Types.ObjectId(idCliente),
      new Types.ObjectId(idVehiculo),
    );
  }

  @Get("get-cliente-vehiculo-by-ids")
  async findClienteVehiculoByIds(
    @Query("idCliente") idCliente: string,
    @Query("idVehiculo") idVehiculo: string,
  ) {
    return this.clienteVehiculoService.findOneByIds(
      new Types.ObjectId(idCliente),
      new Types.ObjectId(idVehiculo),
    );
  }
}
