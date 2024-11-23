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

import { AddEmpleadoDto } from "./dtos/add-empleado.dto";
import { ITaller } from "./interfaces/taller.interfaz";
import { TallerService } from "./taller.service";

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
  async updateTaller(@Body() taller: ITaller) {
    return this.tallerService.updateTaller(taller.id, taller);
  }

  @Put("add-empleado-taller")
  async addEmpleadoToTaller(@Body() addEmpleadoDto: AddEmpleadoDto) {
    const { idTaller, email } = addEmpleadoDto;
    return this.tallerService.addEmployeeToTaller(idTaller, email);
  }

  @Delete("delete-taller")
  async deleteTaller(@Query("idTaller") idTaller: string) {
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
  async findAll(@Query("page") page: number, @Query("limit") limit: number) {
    return this.tallerService.findAll(page, limit);
  }
}
