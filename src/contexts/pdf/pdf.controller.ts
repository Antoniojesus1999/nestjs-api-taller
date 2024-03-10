import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from "@nestjs/common";
// eslint-disable-next-line node/no-extraneous-import
import { Response } from "express";

import { CreatePdfDto } from "./dtos/create.pdf.dto";
import { PdfService } from "./pdf.service";

@Controller("pdf")
export class PdfController {
  constructor(
    private pdfService: PdfService,
    private readonly logger: Logger,
  ) {}

  @Post("")
  @HttpCode(HttpStatus.CREATED)
  async createPdf(@Body() pdf: CreatePdfDto): Promise<void> {
    await this.pdfService.createPdf(pdf);
  }

  @Get("download-pdf")
  @HttpCode(HttpStatus.OK)
  downloadPdf(@Query("name") name: string, @Res() res: Response) {
    try {
      const fileStream = this.pdfService.downloadPDF(name);

      // Configurar cabeceras para la descarga del archivo
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${name}`);

      // Manejar eventos de error y finalización del stream
      fileStream.on("error", err => {
        this.logger.log("Error al leer el archivo PDF:", err);
        res
          .status(500)
          .send(`Error interno del servidor. -> ${JSON.stringify(err)}`);
      });

      fileStream.on("end", () => {
        res.end();
      });

      // Iniciar la transmisión del archivo
      return fileStream.pipe(res);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
