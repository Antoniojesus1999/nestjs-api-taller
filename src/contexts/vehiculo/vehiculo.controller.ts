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
import { ObjectId } from "mongoose";

import { VehiculoService } from "./vehiculo.service";
import { IVehiculo } from "./interfaces/vehiculo.interfaz";

@Controller("vehiculo")
export class VehiculoController {
  constructor(
    private vehiculoService: VehiculoService,
    private readonly logger: Logger,
  ) {}

  @Post("save-vehiculo")
  async saveVehiculo(@Body() vehiculo: IVehiculo) {
    return this.vehiculoService.saveVehiculo(vehiculo);
  }

  @Put("update-vehiculo")
  async updateVehiculo( @Body() vehiculo: IVehiculo) {
    return this.vehiculoService.updateVehiculo(vehiculo.id, vehiculo);
  }

  @Delete("delete-vehiculo")
  async deleteVehiculo(@Query("idVehiculo") idVehiculo: string) {
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

}
