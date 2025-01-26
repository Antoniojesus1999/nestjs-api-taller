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

import { ClienteVehiculoDto } from "../cliente-vehiculo/dtos/cliente-vehiculo.dto";
import { ClienteVehiculoService } from "../cliente-vehiculo/services/cliente-vehiculo.service";
import { SaveVehiculoDto } from "./dtos/save-vehiculo.dto";
import { IVehiculo } from "./interfaces/vehiculo.interfaz";
import { VehiculoService } from "./vehiculo.service";

@Controller("vehiculo")
export class VehiculoController {
  constructor(
    private vehiculoService: VehiculoService,
    private clienteVehiculoService: ClienteVehiculoService,
    private readonly logger: Logger,
  ) {}

  @Post("save-vehiculo")
  async saveVehiculo(@Body() saveVehiculoDto: SaveVehiculoDto) {
    const { idCliente, vehiculo } = saveVehiculoDto;

    let vehiculoDto;

    try {
      // Comprobar si el vehiculo existe
      vehiculoDto = await this.vehiculoService.findVehiculoByMatricula(
        vehiculo.matricula,
      );
      //Si existe se actualiza
      await this.updateVehiculo(vehiculoDto as unknown as IVehiculo);
      this.logger.log(
        `Vehiculo actualizado: ${JSON.stringify(vehiculoDto.id)}`,
      );
    } catch {
      // Si no lo encuentra lo guardamos
      vehiculoDto = await this.vehiculoService.saveVehiculo(vehiculo);
      this.logger.log(`Vehiculo guardado: ${vehiculoDto.id}`);
      const clienteVehiculoDto: ClienteVehiculoDto = new ClienteVehiculoDto(
        "",
        idCliente,
        vehiculoDto.id,
      );

      await this.clienteVehiculoService.saveClienteVehiculo(clienteVehiculoDto);
      this.logger.log(
        `ClienteVehiculo guardado: ${JSON.stringify(clienteVehiculoDto)}`,
      );
    }

    return vehiculoDto;
  }

  @Put("update-vehiculo")
  async updateVehiculo(@Body() vehiculo: IVehiculo) {
    return this.vehiculoService.updateVehiculo(vehiculo.id, vehiculo);
  }

  @Delete("delete-vehiculo")
  async deleteVehiculo(@Query("idVehiculo") idVehiculo: Types.ObjectId) {
    return this.vehiculoService.deleteVehículo(idVehiculo);
  }

  @Get("find-vehiculo-by-matricula")
  async findVehiculoByMatricula(@Query("matricula") matricula: string) {
    return this.vehiculoService.findVehiculoByMatricula(matricula);
  }

  @Get("find-all")
  async findAll() {
    return this.vehiculoService.findAll();
  }

  @Get("find-reparaciones-by-vehiculo")
  async findReparacionesByVehiculo(@Query("idVehiculo") idVehiculo: string) {
    return this.vehiculoService.findReparacionesByVehiculoId(idVehiculo);
  }

  @Get("find-vehiculos-by-cliente")
  async getVehiculosByCliente(@Query("idCliente") idCliente: string) {
    const vehiculosId = await this.clienteVehiculoService.getVehiculosByCliente(
      new Types.ObjectId(idCliente),
    );

    return await this.vehiculoService.findVehiculoByIds(vehiculosId);
  }
}
