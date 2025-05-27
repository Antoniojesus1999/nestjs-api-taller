import { Logger, Module } from "@nestjs/common";

import { ReparacionModule } from "../reparacion/reparacion.module";
import { PdfController } from "./pdf.controller";
import { PdfService } from "./pdf.service";
import { PdfRepService } from "./pdf-rep.service";

@Module({
  imports: [ReparacionModule],
  controllers: [PdfController],
  providers: [PdfService, Logger, PdfRepService],
})
export class PdfModule {}
