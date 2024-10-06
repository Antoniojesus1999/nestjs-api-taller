/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from "node:fs";
import { writeFile } from "node:fs/promises";
import * as path from "node:path";

import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { PDFDocument, setFillingRgbColor, StandardFonts } from "pdf-lib";

import { CreatePdfDto } from "./dtos/create.pdf.dto";

@Injectable()
export class PdfService {
  constructor(private readonly logger: Logger) {}

  async createPdf(dataPdfReq: CreatePdfDto): Promise<void> {
    try {
      this.logger.log(`valor de proces cwd ${process.cwd()}`);
      const pdfData = fs.readFileSync(process.cwd() + "/src/resources/PDF.pdf");
      const pdfDoc = await PDFDocument.load(pdfData);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const fieldNames = pdfDoc
        .getForm()
        .getFields()
        .map(f => f.getName());
      this.logger.log(fieldNames);
      const form = pdfDoc.getForm();
      const imgPath = path.join(
        process.cwd() + "/src/resources",
        "",
        "car_plane.png",
      );
      const img = await pdfDoc.embedPng(fs.readFileSync(imgPath));
      const imagePage = pdfDoc.getPage(0);
      imagePage.drawImage(img, {
        x: 375.5,
        y: 406,
        width: 187,
        height: 104,
      });

      const nombreTaller = form.getTextField("nombreTaller");
      nombreTaller.setText(dataPdfReq.nombreTaller);
      const da = nombreTaller.acroField.getDefaultAppearance() ?? "";
      const newDa = da + setFillingRgbColor(0, 0, 0).toString();
      nombreTaller.acroField.setDefaultAppearance(newDa);
      nombreTaller.setFontSize(14);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      nombreTaller.defaultUpdateAppearances(helveticaBold);

      const direccionTaller = form.getTextField("direccionTaller");
      direccionTaller.setText(dataPdfReq.direccionTaller);
      direccionTaller.acroField.setDefaultAppearance(newDa);
      direccionTaller.setFontSize(10);

      const cpTaller = form.getTextField("cpTaller");
      cpTaller.setText(dataPdfReq.cpTaller);
      cpTaller.acroField.setDefaultAppearance(newDa);
      cpTaller.setFontSize(10);

      const munYProvinTaller = form.getTextField("munYProvinTaller");
      munYProvinTaller.setText(dataPdfReq.munYProvinTaller);
      munYProvinTaller.acroField.setDefaultAppearance(newDa);
      munYProvinTaller.setFontSize(10);

      const nifTaller = form.getTextField("nifTaller");
      nifTaller.setText(dataPdfReq.nifTaller);
      nifTaller.acroField.setDefaultAppearance(newDa);
      nifTaller.setFontSize(10);

      const riiaTaller = form.getTextField("riiaTaller");
      riiaTaller.setText(dataPdfReq.riiaTaller);
      riiaTaller.acroField.setDefaultAppearance(newDa);
      riiaTaller.setFontSize(10);

      const tlfTaller = form.getTextField("tlfTaller");
      tlfTaller.setText(dataPdfReq.tlfTaller);
      tlfTaller.acroField.setDefaultAppearance(newDa);
      tlfTaller.setFontSize(10);

      const numResgDepoTaller = form.getTextField("numResgDepoTaller");
      numResgDepoTaller.setText(dataPdfReq.numResgDepoTaller);
      numResgDepoTaller.acroField.setDefaultAppearance(newDa);
      numResgDepoTaller.setFontSize(10);

      const matriMarcaModeloVeh = form.getTextField("matriMarcaModeloVeh");
      matriMarcaModeloVeh.setText(dataPdfReq.matriMarcaModeloVeh);
      matriMarcaModeloVeh.acroField.setDefaultAppearance(newDa);
      matriMarcaModeloVeh.setFontSize(10);

      const combustibleVeh = form.getTextField("combustibleVeh");
      combustibleVeh.setText(dataPdfReq.combustibleVeh);
      combustibleVeh.acroField.setDefaultAppearance(newDa);
      combustibleVeh.setFontSize(10);

      const seguroVeh = form.getTextField("seguroVeh");
      seguroVeh.setText(dataPdfReq.seguroVeh);
      seguroVeh.acroField.setDefaultAppearance(newDa);
      seguroVeh.setFontSize(10);

      const polizaVeh = form.getTextField("polizaVeh");
      polizaVeh.setText(dataPdfReq.polizaVeh);
      polizaVeh.acroField.setDefaultAppearance(newDa);
      polizaVeh.setFontSize(10);

      const kmsVeh = form.getTextField("kmsVeh");
      kmsVeh.setText(dataPdfReq.kmsVeh);
      kmsVeh.acroField.setDefaultAppearance(newDa);
      kmsVeh.setFontSize(10);

      const chasisVeh = form.getTextField("chasisVeh");
      chasisVeh.setText(dataPdfReq.chasisVeh);
      chasisVeh.acroField.setDefaultAppearance(newDa);
      chasisVeh.setFontSize(10);

      const fecEntradaVeh = form.getTextField("fecEntradaVeh");
      fecEntradaVeh.setText(dataPdfReq.fecEntradaVeh);
      fecEntradaVeh.acroField.setDefaultAppearance(newDa);
      fecEntradaVeh.setFontSize(10);

      const fecSalidaVeh = form.getTextField("fecSalidaVeh");
      fecSalidaVeh.setText(dataPdfReq.fecSalidaVeh);
      fecSalidaVeh.acroField.setDefaultAppearance(newDa);
      fecSalidaVeh.setFontSize(10);

      const nomCliente = form.getTextField("nomCliente");
      nomCliente.setText(dataPdfReq.nomCliente);
      nomCliente.acroField.setDefaultAppearance(newDa);
      nomCliente.setFontSize(10);

      const ape1Cliente = form.getTextField("ape1Cliente");
      ape1Cliente.setText(dataPdfReq.ape1Cliente);
      ape1Cliente.acroField.setDefaultAppearance(newDa);
      ape1Cliente.setFontSize(10);

      const ape2Cliente = form.getTextField("ape2Cliente");
      ape2Cliente.setText(dataPdfReq.ape2Cliente);
      ape2Cliente.acroField.setDefaultAppearance(newDa);
      ape2Cliente.setFontSize(10);

      const nifCliente = form.getTextField("nifCliente");
      nifCliente.setText(dataPdfReq.nifCliente);
      nifCliente.acroField.setDefaultAppearance(newDa);
      nifCliente.setFontSize(10);

      const emailCliente = form.getTextField("emailCliente");
      emailCliente.setText(dataPdfReq.emailCliente);
      emailCliente.acroField.setDefaultAppearance(newDa);
      emailCliente.setFontSize(10);

      const tlfCliente = form.getTextField("tlfCliente");
      tlfCliente.setText(dataPdfReq.tlfCliente);
      tlfCliente.acroField.setDefaultAppearance(newDa);
      tlfCliente.setFontSize(10);

      const tareasRealizadas = form.getTextField("tareasRealizadas");
      tareasRealizadas.setText(dataPdfReq.tareasRealizadas);
      tareasRealizadas.acroField.setDefaultAppearance(newDa);
      tareasRealizadas.setFontSize(10);

      const pdfBytes = await pdfDoc.save();
      await writeFile("output.pdf", pdfBytes);

      this.logger.log("PDF creado exitosamente");
    } catch (error) {
      this.logger.error(`Error en el pdf ${JSON.stringify(error)}`);
      throw new InternalServerErrorException({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error en el pdf",
      });
    }
  }
}
