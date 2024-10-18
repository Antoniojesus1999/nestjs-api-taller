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

import { EmpleadoDto } from "../taller/dtos/empleado.dto";
import { EmpleadoService } from "./empleado..service";
import { IEmpleado } from "./interfaces/empleado.interfaz";

@Controller("empleado")
export class EmpleadoController {
  private readonly logger = new Logger(EmpleadoController.name);
  constructor(private empleadoService: EmpleadoService) {}

  @Post("add-empleado")
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
  async findReparacionesByTaller(@Query("id") id: string) {
    this.logger.log(`Buscando empleado por id del taller ${id}`);
    return this.empleadoService.findEmpleadoById(id);
  }
}
