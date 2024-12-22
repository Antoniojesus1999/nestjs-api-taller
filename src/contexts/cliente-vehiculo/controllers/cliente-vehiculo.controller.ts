import { Controller, Delete, Get, Logger, Param, Query } from "@nestjs/common";
import { Types } from "mongoose";

import { ClienteVehiculo } from "../schemas/cliente-vehiculo.schema";
import { ClienteVehiculoService } from "../services/cliente-vehiculo.service";

@Controller("cliente-vehiculo")
export class ClienteVehiculoController {
  constructor(
    private clienteVehiculoService: ClienteVehiculoService,
    private readonly logger: Logger,
  ) {}

  @Delete("delete-cliente-vehiculo/:idCliente/:idVehiculo")
  async deleteClienteVehiculo(
    @Param("idCliente") idCliente: string,
    @Param("idVehiculo") idVehiculo: string,
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
  ): Promise<ClienteVehiculo> {
    return this.clienteVehiculoService.findOneByIds(
      new Types.ObjectId(idCliente),
      new Types.ObjectId(idVehiculo),
    );
  }
}
