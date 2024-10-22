import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common";

import { CargaMarcaDto } from "./dtos/carga-marca.dto";
import { MarcaDto } from "./dtos/marca.dto";
import { ModeloDto } from "./dtos/modelo.dto";
import { MarcaService } from "./marca.service";
import { Modelo } from "./schemas/modelo.schema";

@Controller("marcas")
export class MarcaController {
  constructor(
    private marcaService: MarcaService,
    private readonly logger: Logger,
  ) {}

  @Post("cargar-marcas-modelo")
  cargarMarcasModelo(@Body() cargaMarcaDto: CargaMarcaDto[]) {
    for (const marca of cargaMarcaDto) {
      const modeloArray = new Array<Modelo>();

      const marcaNew = new MarcaDto(
        "",
        marca.name,
        marca.slug,
        modeloArray as [ModeloDto],
        new Date(),
        new Date(),
      );

      for (const modelo of marca.models) {
        const modeloNew = new ModeloDto(modelo.name, modelo.slug);

        marcaNew.modelos?.push(modeloNew);
      }

      void this.marcaService.saveMarca(marcaNew);
    }

    return "";
  }

  @Get("find-all-marcas")
  async findTallerByCif(
    @Query("page") page: number,
    @Query("limit") limit: number = 10,
  ) {
    return this.marcaService.findAll(page, limit);
  }

  /*
  @Put("add-modelo-marca")
  async addModeloToMarca(@Body() addEmpleadoDto: AddEmpleadoDto) {
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
  */
}
