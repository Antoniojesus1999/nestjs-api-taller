import { createReadStream } from "node:fs";
import { join } from "node:path";

import {
  Controller,
  Get,
  Header,
  Logger,
  Query,
  StreamableFile,
} from "@nestjs/common";

import { ReparacionService } from "../reparacion/reparacion.service";
import { PdfRepService } from "./pdf-rep.service";

@Controller("pdf")
export class PdfController {
  constructor(
    private pdfRepService: PdfRepService,
    private reparacionService: ReparacionService,
    private readonly logger: Logger,
  ) {}

  /*@Post("")
  @HttpCode(HttpStatus.CREATED)
  async createPdfPostMan(@Body() pdf: CreatePdfDto): Promise<void> {
    await this.pdfService.createPdf(pdf);
  }*/

  @Get("create-pdf")
  @Header("Content-Type", "application/pdf")
  async createPdf(
    @Query("idReparacion") idReparacion: string,
  ): Promise<StreamableFile> {
    const reparacionDto =
      await this.reparacionService.findReparacionesById(idReparacion);
    await this.pdfRepService.createPdf(reparacionDto);
    const pdfPath = join(
      process.cwd(),
      "/pdfReparacion/",
      reparacionDto.id + ".pdf",
    );
    const fileStream = createReadStream(pdfPath);
    return new StreamableFile(fileStream);
  }

  /*@Get("download-pdf")
  @HttpCode(HttpStatus.OK)
  @Header("Content-Type", "application/pdf")
  @Header("Content-Disposition", `attachment; filename=:filename`)
  downloadPdf(@Query("name") name: string): StreamableFile {
    const pdfPath = join(process.cwd(), "src", "resources", name);
    const fileStream = createReadStream(pdfPath);
    return new StreamableFile(fileStream);
  }*/
}
