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

import { IDanyo } from "./interfaces/danyo.interfaz";
import { IReparacion } from "./interfaces/reparacion.interfaz";
import { ITrabajo } from "./interfaces/trabajo.interfaz";
import { ReparacionService } from "./reparacion.service";

@Controller("reparacion")
export class ReparacionController {
  //private readonly logger = new Logger(ReparacionController.name);
  constructor(
    private reparacionService: ReparacionService,
    private readonly logger: Logger,
  ) {}

  @Post("save-reparacion")
  async saveReparacion(@Body() reparacion: IReparacion) {
    return this.reparacionService.saveReparacion(reparacion);
  }

  @Put("update-reparacion")
  async updateReparacion(
    @Query("idReparacion") idReparacion: string,
    @Body() reparacion: IReparacion,
  ) {
    return this.reparacionService.updateReparacion(idReparacion, reparacion);
  }

  @Put("add-trabajo-raparacion")
  async addTrabajoToReparacion(
    @Query("idReparacion") idReparacion: string,
    @Body() trabajo: ITrabajo,
  ) {
    return this.reparacionService.addTrabajoToReparacion(idReparacion, trabajo);
  }

  @Put("add-danyo-raparacion")
  async addDanyoToReparacion(
    @Query("idReparacion") idReparacion: string,
    @Body() danyo: IDanyo,
  ) {
    return this.reparacionService.addDanyoToReparacion(idReparacion, danyo);
  }

  @Delete("delete-reparacion")
  async deleteReparacion(@Query("idReparacion") idReparacion: ObjectId) {
    return this.reparacionService.deleteReparacion(idReparacion);
  }

  @Get("find-reparaciones-by-taller")
  async findReparacionesByTaller(
    @Query("idTaller") idTaller: string,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    this.logger.log(`Buscando reparaciones del taller ${idTaller}`);
    return this.reparacionService.findReparacionesByTallerId(
      idTaller,
      page,
      limit,
    );
  }
}
