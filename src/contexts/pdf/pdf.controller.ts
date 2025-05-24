// eslint-disable-next-line node/no-extraneous-import

import { createReadStream } from "node:fs";
import { join } from "node:path";

import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  StreamableFile,
} from "@nestjs/common";

import { ReparacionService } from "../reparacion/reparacion.service";
import { CreatePdfDto } from "./dtos/create.pdf.dto";
import { PdfMapper } from "./mappers/pdf.mapper";
import { PdfService } from "./pdf.service";

@Controller("pdf")
export class PdfController {
  constructor(
    private pdfService: PdfService,
    private reparacionService: ReparacionService,
    private readonly logger: Logger,
  ) {}

  @Post("")
  @HttpCode(HttpStatus.CREATED)
  async createPdfPostMan(@Body() pdf: CreatePdfDto): Promise<void> {
    await this.pdfService.createPdf(pdf);
  }

  @Get("create-pdf")
  async createPdf(@Query("idReparacion") idReparacion: string) {
    const reparacionDto =
      await this.reparacionService.findReparacionesById(idReparacion);
    const pdfDto = PdfMapper.toDto(reparacionDto);
    //TODO: LLAMAR A pdfService.createPdf (modificar función para que guarde en carpeta de reparación y devuelva le pdfBytes)
  }

  @Get("download-pdf")
  @HttpCode(HttpStatus.OK)
  @Header("Content-Type", "application/pdf")
  @Header("Content-Disposition", `attachment; filename=:filename`)
  downloadPdf(@Query("name") name: string): StreamableFile {
    const pdfPath = join(process.cwd(), "src", "resources", name);
    const fileStream = createReadStream(pdfPath);
    return new StreamableFile(fileStream);
  }
}
