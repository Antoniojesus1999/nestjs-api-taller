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

import { EmpleadoDto } from "./dtos/empleado.dto";
import { EmpleadoService } from "./empleado.service";
import { IEmpleado } from "./interfaces/empleado.interfaz";

@Controller("empleado")
export class EmpleadoController {
  private readonly logger = new Logger(EmpleadoController.name);
  constructor(private empleadoService: EmpleadoService) {}

  @Post("save-empleado")
  async saveEmpleado(@Body() empleado: IEmpleado): Promise<EmpleadoDto> {
    return this.empleadoService.saveEmpleado(empleado);
  }

  @Put("update-empleado")
  async updateReparacion(
    @Query("idReparacion") idReparacion: string,
    @Body() empleado: IEmpleado,
  ) {
    return this.empleadoService.updateEmpleado(idReparacion, empleado);
  }

  @Delete("delete-empleado")
  async deleteReparacion(@Query("id") id: ObjectId) {
    return this.empleadoService.deleteEmpleado(id);
  }

  @Get("find-empleado-by-id")
  async findEmpleadoById(@Query("id") id: string) {
    this.logger.log(`Buscando empleado por id ${id}`);
    return this.empleadoService.findEmpleadoById(id);
  }

  @Get("find-empleado-by-email")
  async findEmpeladoByEmail(@Query("email") email: string) {
    this.logger.log(`Buscando empleado por email ${email}`);
    return this.empleadoService.findEmpleadoByEmail(email);
  }

  @Get("find-empleado-by-uid")
  async findEmpeladoByUid(@Query("uid") uid: string) {
    this.logger.log(`Buscando empleado por uid ${uid}`);
    return this.empleadoService.findEmpleadoByUid(uid);
  }
}
