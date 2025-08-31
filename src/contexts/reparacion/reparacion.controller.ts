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

import { ReparacionDto } from "./dtos/reparacion.dto";
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

  @Put("add-list-trabajo-reparacion")
  async addListTrabajoToReparacion(
    @Query("idReparacion") idReparacion: string,
    @Body() listaTrabajos: Array<string>,
  ) {
    return this.reparacionService.addListTrabajoToReparacion(
      idReparacion,
      listaTrabajos,
    );
  }

  @Get("find-trabajo-by-reparacion")
  async findTrabajoByReparacion(@Query("idReparacion") idReparacion: string) {
    this.logger.log(
      `Buscando trabajos de la reparacion con id ${idReparacion}`,
    );
    return this.reparacionService.findTrabajoByReparacion(idReparacion);
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
  @Get("find-reparacion-by-id")
  async findReparacionesByID(@Query("id") id: string): Promise<ReparacionDto> {
    this.logger.log(`Buscando reparaciones por id ${id}`);
    return this.reparacionService.findReparacionesById(id);
  }
}
