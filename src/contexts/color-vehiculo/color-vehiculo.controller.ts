import { Body, Controller, Get, Logger, Post } from "@nestjs/common";

import { ColorVehiculoService } from "./color-vehiculo.service";
import { ColorVehiculoDto } from "./dtos/color-vehiculo.dto";

@Controller("color-vehiculo")
export class ColorVehiculoController {
  constructor(
    private colorVehiculoService: ColorVehiculoService,
    private readonly logger: Logger,
  ) {}

  @Post("cargar-colores")
  cargarColores(@Body() colorDto: ColorVehiculoDto[]) {
    this.logger.log(`Valor del body -> `);
    this.logger.log(colorDto);
    for (const color of colorDto) {
      const colorNew = new ColorVehiculoDto(
        "",
        color.nombre,
        color.colorR,
        color.colorG,
        color.colorB,
        new Date(),
        new Date(),
      );

      void this.colorVehiculoService.saveColor(colorNew);
    }

    return "";
  }

  @Get("find-all-colores")
  async findAllColores() {
    return this.colorVehiculoService.findAll();
  }
}
