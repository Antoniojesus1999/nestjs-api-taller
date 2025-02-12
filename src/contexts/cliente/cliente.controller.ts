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
import { Types } from "mongoose";

import { TallerClienteDto } from "../taller-cliente/dtos/taller-cliente.dto";
import { TallerClienteService } from "../taller-cliente/services/taller-cliente.service";
import { ClienteService } from "./cliente.service";
import { SaveClienteDto } from "./dtos/save-cliente.dto";
import { ICliente } from "./interfaces/cliente.interfaz";
@Controller("cliente")
export class ClienteController {
  constructor(
    private clienteService: ClienteService,
    private tallerClienteService: TallerClienteService,
    private readonly logger: Logger,
  ) {}

  @Post("save-cliente")
  async saveCliente(@Body() saveClienteDto: SaveClienteDto) {
    const { idTaller, cliente } = saveClienteDto;
    let clienteDto;
    this.logger.log(`Petición recibida con los datos_ Guardando cliente: ${JSON.stringify(cliente)}`);
    // Comprobar si el cliente existe
    try {
      clienteDto = await this.clienteService.findClienteByNif(cliente.nif);

      // Si lo encuentra lo actualizamos con el que nos entre por peticion
      clienteDto = await this.clienteService.updateCliente(
        clienteDto.id,
        cliente,
      );
      this.logger.log(`Cliente actualizado: ${JSON.stringify(clienteDto.id)}`);
    } catch {
      // Si no lo encuentra lo guardamos
      clienteDto = await this.clienteService.saveCliente(cliente);
      this.logger.log(`Cliente guardado: ${clienteDto.id}`);
    }

    const tallerClienteDto: TallerClienteDto = new TallerClienteDto(
      "",
      idTaller,
      clienteDto.id,
    );

    await this.tallerClienteService.saveTallerCliente(tallerClienteDto);
    this.logger.log(
      `TallerCliente guardado: ${JSON.stringify(tallerClienteDto)}`,
    );
    return clienteDto;
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

  @Get("get-clientes-by-taller")
  async getClientesByTaller(@Query("idTaller") idTaller: string) {
    const clientesId = await this.tallerClienteService.getClientesByTaller(
      new Types.ObjectId(idTaller),
    );

    return await this.clienteService.findClienteByIds(clientesId);
  }
}
