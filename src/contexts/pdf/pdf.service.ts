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
import { PDFDocument, setFillingRgbColor } from "pdf-lib";

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
      const imgPath = path.join("src/resources/car_plane.png");
      const img = await pdfDoc.embedPng(fs.readFileSync(imgPath));
      const imagePage = pdfDoc.getPage(0);
      imagePage.drawImage(img, {
        x: 390, //350
        y: 310, //300
        width: 175,
        height: 200,
      });

      const nombreTaller = form.getTextField("nombreTaller");
      nombreTaller.setText(dataPdfReq.nombreTaller);
      const da = nombreTaller.acroField.getDefaultAppearance() ?? "";
      const newDa = da + setFillingRgbColor(0, 0, 0).toString();
      nombreTaller.acroField.setDefaultAppearance(newDa);

      const cpTaller = form.getTextField("cpTaller");
      cpTaller.setText(dataPdfReq.cpTaller);
      cpTaller.acroField.setDefaultAppearance(newDa);

      const munYProvinTaller = form.getTextField("munYProvinTaller");
      munYProvinTaller.setText(dataPdfReq.munYProvinTaller);
      munYProvinTaller.acroField.setDefaultAppearance(newDa);

      const nifTaller = form.getTextField("nifTaller");
      nifTaller.setText(dataPdfReq.nifTaller);
      nifTaller.acroField.setDefaultAppearance(newDa);

      const riiaTaller = form.getTextField("riiaTaller");
      riiaTaller.setText(dataPdfReq.riiaTaller);
      riiaTaller.acroField.setDefaultAppearance(newDa);

      const tlfTaller = form.getTextField("tlfTaller");
      tlfTaller.setText(dataPdfReq.tlfTaller);
      tlfTaller.acroField.setDefaultAppearance(newDa);

      const numResgDepoTaller = form.getTextField("numResgDepoTaller");
      numResgDepoTaller.setText(dataPdfReq.numResgDepoTaller);
      numResgDepoTaller.acroField.setDefaultAppearance(newDa);

      const matriculaVeh = form.getTextField("matriculaVeh");
      matriculaVeh.setText(dataPdfReq.matriculaVeh);
      matriculaVeh.acroField.setDefaultAppearance(newDa);

      const marcaModeloVeh = form.getTextField("marcaModeloVeh");
      marcaModeloVeh.setText(dataPdfReq.marcaModeloVeh);
      marcaModeloVeh.acroField.setDefaultAppearance(newDa);

      const combustibleVeh = form.getTextField("combustibleVeh");
      combustibleVeh.setText(dataPdfReq.combustibleVeh);
      combustibleVeh.acroField.setDefaultAppearance(newDa);

      const seguroVeh = form.getTextField("seguroVeh");
      seguroVeh.setText(dataPdfReq.seguroVeh);
      seguroVeh.acroField.setDefaultAppearance(newDa);

      const polizaVeh = form.getTextField("polizaVeh");
      polizaVeh.setText(dataPdfReq.polizaVeh);
      polizaVeh.acroField.setDefaultAppearance(newDa);

      const kmsVeh = form.getTextField("kmsVeh");
      kmsVeh.setText(dataPdfReq.kmsVeh);
      kmsVeh.acroField.setDefaultAppearance(newDa);

      const chasisVeh = form.getTextField("chasisVeh");
      chasisVeh.setText(dataPdfReq.chasisVeh);
      chasisVeh.acroField.setDefaultAppearance(newDa);

      const ape1Cliente_2 = form.getTextField("ape1Cliente_2");
      ape1Cliente_2.setText(dataPdfReq.ape1Cliente_2);
      ape1Cliente_2.acroField.setDefaultAppearance(newDa);

      const fecEntradaVeh = form.getTextField("fecEntradaVeh");
      fecEntradaVeh.setText(dataPdfReq.fecEntradaVeh);
      fecEntradaVeh.acroField.setDefaultAppearance(newDa);

      const fecSalidaVeh = form.getTextField("fecSalidaVeh");
      fecSalidaVeh.setText(dataPdfReq.fecSalidaVeh);
      fecSalidaVeh.acroField.setDefaultAppearance(newDa);

      const nomCliente = form.getTextField("nomCliente");
      nomCliente.setText(dataPdfReq.nomCliente);
      nomCliente.acroField.setDefaultAppearance(newDa);

      const ape1Cliente = form.getTextField("ape1Cliente");
      ape1Cliente.setText(dataPdfReq.ape1Cliente);
      ape1Cliente.acroField.setDefaultAppearance(newDa);

      const nifCliente = form.getTextField("nifCliente");
      nifCliente.setText(dataPdfReq.nifCliente);
      nifCliente.acroField.setDefaultAppearance(newDa);

      const emailCliente = form.getTextField("emailCliente");
      emailCliente.setText(dataPdfReq.emailCliente);
      emailCliente.acroField.setDefaultAppearance(newDa);

      const tlfCliente = form.getTextField("tlfCliente");
      tlfCliente.setText(dataPdfReq.tlfCliente);
      tlfCliente.acroField.setDefaultAppearance(newDa);

      const tareasRealizadas = form.getTextField("tareasRealizadas");
      tareasRealizadas.setText(dataPdfReq.tareasRealizadas);
      tareasRealizadas.acroField.setDefaultAppearance(newDa);

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
