import { Module } from "@nestjs/common";

import { ReparacionModule } from "../reparacion/reparacion.module";
import { GeneratePdfService } from "./generate-pdf.service";
import { PdfController } from "./pdf.controller";

@Module({
  imports: [ReparacionModule],
  controllers: [PdfController],
  providers: [GeneratePdfService],
})
export class PdfModule {}
