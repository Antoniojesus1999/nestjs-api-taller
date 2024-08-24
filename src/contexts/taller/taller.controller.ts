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

import { TallerDto } from "./dtos/taller.dto";
import { TallerService } from "./taller.service";
import { IEmpleado } from "./interfaces/empleado.interfaz";
import { ITaller } from "./interfaces/taller.interfaz";

@Controller("taller")
export class TallerController {
  constructor(
    private tallerService: TallerService,
    private readonly logger: Logger,
  ) {}

  @Post("save-taller")
  async saveTaller(@Body() taller: ITaller) {
    return this.tallerService.saveTaller(taller);
  }

  @Put("update-taller")
  async updateTaller(
    @Query("idTaller") idTaller: string,
    @Body() taller: ITaller,
  ) {
    return this.tallerService.updateTaller(idTaller, taller);
  }

  @Put("add-empleado-taller")
  async addEmpleadoToTaller(
    @Query("idTaller") idTaller: string,
    @Body() empleado: IEmpleado,
  ) {
    return this.tallerService.addEmployeeToTaller(idTaller, empleado);
  }

  @Delete("delete-taller")
  async deleteTaller(@Query("idTaller") idTaller: ObjectId) {
    return this.tallerService.deleteTaller(idTaller);
  }

  @Get("find-taller-by-cif")
  async findTallerByCif(@Query("cif") cif: string) {
    return this.tallerService.findTallerByCif(cif);
  }

  @Get("find-taller-by-empleado")
  async findTallerByEmpleado(@Query("email") email: string) {
    return this.tallerService.findByEmpleado(email);
  }

  @Get("find-all")
  async findAll(
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    return this.tallerService.findAll(page, limit);
  }
}
