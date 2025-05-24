import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { DanoVehiculoImageService } from "./dano-vehiculo-image.service";
import { UpdateDanoVehiculoImageDto } from "./dto/update-dano-vehiculo-image.dto";
import { FastifyRequest } from "fastify";

@Controller("dano-vehiculo-image")
export class DanoVehiculoImageController {
  constructor(
    private readonly logger: Logger,
    private readonly danoVehiculoImageService: DanoVehiculoImageService,
  ) {}

  /*@Post()
  @UseInterceptors(FileInterceptor("file"))
  async save(@UploadedFile() file: { originalname: string; buffer: Buffer }) {
    if (!file) {
      return { message: "❌ No se recibió ningún archivo" };
    }

    await this.danoVehiculoImageService.saveImage(file);
    this.logger.log("✅ Imagen guardada correctamente ", file);
  }*/

  @Post()
  async save(@Req() request: FastifyRequest) {
    const file = await request.file(); // Obtener el archivo enviado
    if (!file) {
      return { message: "❌ No se recibió ningún archivo" };
    }
    const data = await file.toBuffer(); // Convertir el archivo a un buffer
    const fileName = file.filename;

    await this.danoVehiculoImageService.saveImage({ fileName: fileName, buffer: data });
    this.logger.log("✅ Imagen guardada correctamente ", file);
  }


  @Get()
  findAll() {
    return this.danoVehiculoImageService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.danoVehiculoImageService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDanoVehiculoImageDto: UpdateDanoVehiculoImageDto,
  ) {
    return this.danoVehiculoImageService.update(
      +id,
      updateDanoVehiculoImageDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.danoVehiculoImageService.remove(+id);
  }
}
