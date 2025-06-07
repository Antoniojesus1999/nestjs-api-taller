import { ReparacionModule } from "../reparacion/reparacion.module";
import { PdfController } from "./pdf.controller";
import { PdfService } from "./pdf.service";

@Module({
  imports: [ReparacionModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
