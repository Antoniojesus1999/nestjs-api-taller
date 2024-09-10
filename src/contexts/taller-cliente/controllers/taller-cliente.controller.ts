import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
} from "@nestjs/common";

import { TallerClienteService } from "../services/taller-cliente.service";
import { ClienteService } from "@src/contexts/cliente/cliente.service";
import { SaveTallerClienteDto } from "../dtos/saveTallerCliente.dto";
import { TallerClienteDto } from "../dtos/tallerCliente.dto";
import { DeleteTallerClienteDto } from "../dtos/deleteTallerCliente.dto";
import { Types } from "mongoose";

@Controller("taller-cliente")
export class TallerClienteController {
  constructor(
    private tallerClienteService: TallerClienteService,
    private clienteService: ClienteService,
    private readonly logger: Logger,
  ) {}

  @Post("save-taller-cliente")
  async saveTallerCliente(@Body() saveTallerClienteDto: SaveTallerClienteDto) {
    const {idTaller, cliente} = saveTallerClienteDto;
    let clienteDto;

    // Comprobar si el cliente existe
    try {
      clienteDto = await this.clienteService.findClienteByNif(cliente.nif);

      // Si lo encuentra lo actualizamos con el que nos entre por peticion
      clienteDto = await this.clienteService.updateCliente(clienteDto.id, cliente);
    } catch(e) {
      // Si no lo encuentra lo guardamos
      clienteDto = await this.clienteService.saveCliente(cliente);
    }

    const tallerClienteDto = new TallerClienteDto("",idTaller, clienteDto.id);

    await this.tallerClienteService.saveTallerCliente(tallerClienteDto);

    return clienteDto;
  }

  @Delete("delete-taller-cliente")
  async deleteTallerCliente(@Query("idTaller") idTaller: string, @Query("idCliente") idCliente: string) {
    return this.tallerClienteService.deleteTallerCliente(new Types.ObjectId(idTaller), new Types.ObjectId(idCliente));
  }

  @Get("get-taller-cliente-by-ids")
  async findTallerClienteByIds(@Query("idTaller") idTaller: string, @Query("idCliente") idCliente: string) {
    return this.tallerClienteService.findOneByIds(new Types.ObjectId(idTaller), new Types.ObjectId(idCliente));
  }

  @Get("get-clientes-by-taller")
  async getClientesByTaller(@Query("idTaller") idTaller: string) {
    const clientesId = await this.tallerClienteService.getClientesByTaller(new Types.ObjectId(idTaller));
    this.logger.log('clientesId: ' + clientesId);

    return await this.clienteService.findClienteByIds(clientesId); 
  }

}
