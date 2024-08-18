import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from "@nestjs/common";

import { TallerService } from "./taller.service";
import { ObjectId } from "mongoose";
import { TallerDto } from "./dtos/taller.dto";

@Controller("taller")
export class TallerController {
  constructor(
    private tallerService: TallerService,
    private readonly logger: Logger,
  ) {}

  @Post("save-taller")
  async saveTaller(@Body() taller: TallerDto) {
    return this.tallerService.saveTaller(taller);
  }

  @Put("update-taller")
  async updateTaller(@Query('idTaller') idTaller: string, @Body() taller: TallerDto) {
    return this.tallerService.updateTaller(idTaller, taller);
  }

  @Delete("delete-taller")
  async deleteTaller(@Query('idTaller') idTaller: ObjectId) {
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

  @Get()
  async findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return this.tallerService.findAll(page, limit);
  }
}


