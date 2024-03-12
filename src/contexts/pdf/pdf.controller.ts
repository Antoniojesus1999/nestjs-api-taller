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
  @Header("Content-Type", "application/pdf")
  @Header("Content-Disposition", `attachment; filename=:filename`)
  downloadPdf(@Query("name") name: string): StreamableFile {
    const pdfPath = join(process.cwd(), "src", "resources", name);
    const fileStream = createReadStream(pdfPath);
    return new StreamableFile(fileStream);
  }
}
