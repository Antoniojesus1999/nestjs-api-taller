import * as fs from "node:fs";
import { writeFile } from "node:fs/promises";
import * as path from "node:path";

import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { PDFDocument, setFillingRgbColor, StandardFonts } from "pdf-lib";

import { ReparacionDto } from "../reparacion/dtos/reparacion.dto";

@Injectable()
export class PdfService {
  constructor(private readonly logger: Logger) {}

  //async createPdf(dataPdfReq: CreatePdfDto): Promise<void> {
  async createPdf(reparacion: ReparacionDto): Promise<void> {
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

      const byteImage: Buffer = await this.getImageDanos(reparacion.id);
      const img = await pdfDoc.embedPng(byteImage);

      const imagePage = pdfDoc.getPage(0);
      imagePage.drawImage(img, {
        x: 375.5,
        y: 406,
        width: 187,
        height: 104,
      });

      // imagePage.drawRectangle({
      //   x: 347,
      //   y: 58,
      //   width: 180,
      //   height: 50,
      //   color: rgb(1, 0, 0), // Rojo brillante
      //   opacity: 0.5, // Semitransparente para que no tape contenido
      // });

      if (reparacion.cliente.firmaBase64) {
        //const imageBuffer = Buffer.from(dataPdfReq.firmaBase64, "base64");
        const firmaImg = await pdfDoc.embedPng(reparacion.cliente.firmaBase64);
        imagePage.drawImage(firmaImg, {
          x: 347,
          y: 58,
          width: 180,
          height: 50,
        });
      }

      const nombreTaller = form.getTextField("nombreTaller");
      nombreTaller.setText(reparacion.taller.nombre);
      const da = nombreTaller.acroField.getDefaultAppearance() ?? "";
      const newDa = da + setFillingRgbColor(0, 0, 0).toString();
      nombreTaller.acroField.setDefaultAppearance(newDa);
      nombreTaller.setFontSize(14);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      nombreTaller.defaultUpdateAppearances(helveticaBold);

      const direccionTaller = form.getTextField("direccionTaller");
      direccionTaller.setText(reparacion.taller.direccion);
      direccionTaller.acroField.setDefaultAppearance(newDa);
      direccionTaller.setFontSize(10);

      const cpTaller = form.getTextField("cpTaller");
      cpTaller.setText(reparacion.taller.cp);
      cpTaller.acroField.setDefaultAppearance(newDa);
      cpTaller.setFontSize(10);

      const munYProvinTaller = form.getTextField("munYProvinTaller");
      munYProvinTaller.setText(
        `${reparacion.taller.municipio} ${reparacion.taller.provincia}`,
      );
      munYProvinTaller.acroField.setDefaultAppearance(newDa);
      munYProvinTaller.setFontSize(10);

      const nifTaller = form.getTextField("nifTaller");
      nifTaller.setText(reparacion.taller.cif);
      nifTaller.acroField.setDefaultAppearance(newDa);
      nifTaller.setFontSize(10);

      const riiaTaller = form.getTextField("riiaTaller");
      riiaTaller.setText(reparacion.taller.riia);
      riiaTaller.acroField.setDefaultAppearance(newDa);
      riiaTaller.setFontSize(10);

      const tlfTaller = form.getTextField("tlfTaller");
      tlfTaller.setText(reparacion.taller.telefono);
      tlfTaller.acroField.setDefaultAppearance(newDa);
      tlfTaller.setFontSize(10);

      // const numResgDepoTaller = form.getTextField("numResgDepoTaller");
      // numResgDepoTaller.setText(reparacion.taller.?¿?¿);
      // numResgDepoTaller.acroField.setDefaultAppearance(newDa);
      // numResgDepoTaller.setFontSize(10);

      const matriMarcaModeloVeh = form.getTextField("matriMarcaModeloVeh");
      matriMarcaModeloVeh.setText(
        `${reparacion.vehiculo.matricula} ${reparacion.vehiculo.marca} ${reparacion.vehiculo.modelo}`,
      );
      matriMarcaModeloVeh.acroField.setDefaultAppearance(newDa);
      matriMarcaModeloVeh.setFontSize(10);

      const combustibleVeh = form.getTextField("combustibleVeh");
      combustibleVeh.setText(reparacion.vehiculo.combustible);
      combustibleVeh.acroField.setDefaultAppearance(newDa);
      combustibleVeh.setFontSize(10);

      // const seguroVeh = form.getTextField("seguroVeh");
      // seguroVeh.setText(reparacion.vehiculo.?¿?¿?);
      // seguroVeh.acroField.setDefaultAppearance(newDa);
      // seguroVeh.setFontSize(10);

      // const polizaVeh = form.getTextField("polizaVeh");
      // polizaVeh.setText(reparacion.vehiculo.?¿?¿?);
      // polizaVeh.acroField.setDefaultAppearance(newDa);
      // polizaVeh.setFontSize(10);

      const kmsVeh = form.getTextField("kmsVeh");
      kmsVeh.setText(reparacion.kilometros);
      kmsVeh.acroField.setDefaultAppearance(newDa);
      kmsVeh.setFontSize(10);

      // const chasisVeh = form.getTextField("chasisVeh");
      // chasisVeh.setText(reparacion.vehiculo.?¿?¿?);
      // chasisVeh.acroField.setDefaultAppearance(newDa);
      // chasisVeh.setFontSize(10);

      //const fecEntradaVeh = form.getTextField("fecEntradaVeh");
      //const fecha = new Date().toISOString().split("T")[0]; // "2025-05-31"

      //fecEntradaVeh.setText("NO coge este valor");
      //fecEntradaVeh.acroField.setDefaultAppearance(newDa);
      //fecEntradaVeh.setFontSize(10);
      /*
      const fecSalidaVeh = form.getTextField("fecSalidaVeh");
      fecSalidaVeh.setText(reparacion.vehiculo.?¿?¿?);
      fecSalidaVeh.acroField.setDefaultAppearance(newDa);
      fecSalidaVeh.setFontSize(10);
      */
      const nomCliente = form.getTextField("nomCliente");
      nomCliente.setText(reparacion.cliente.nombre);
      nomCliente.acroField.setDefaultAppearance(newDa);
      nomCliente.setFontSize(10);

      const ape1Cliente = form.getTextField("ape1Cliente");
      ape1Cliente.setText(reparacion.cliente.apellido1);
      ape1Cliente.acroField.setDefaultAppearance(newDa);
      ape1Cliente.setFontSize(10);

      const ape2Cliente = form.getTextField("ape2Cliente");
      ape2Cliente.setText(reparacion.cliente.apellido2);
      ape2Cliente.acroField.setDefaultAppearance(newDa);
      ape2Cliente.setFontSize(10);

      const nifCliente = form.getTextField("nifCliente");
      nifCliente.setText(reparacion.cliente.nif);
      nifCliente.acroField.setDefaultAppearance(newDa);
      nifCliente.setFontSize(10);

      const emailCliente = form.getTextField("emailCliente");
      emailCliente.setText(reparacion.cliente.email);
      emailCliente.acroField.setDefaultAppearance(newDa);
      emailCliente.setFontSize(10);

      const tlfCliente = form.getTextField("tlfCliente");
      tlfCliente.setText(reparacion.cliente.telefono);
      tlfCliente.acroField.setDefaultAppearance(newDa);
      tlfCliente.setFontSize(10);

      const tareasRealizadas = form.getTextField("tareasRealizadas");
      tareasRealizadas.setText(
        reparacion.trabajos.map(trabajo => trabajo.descripcion).join("\n"),
      );
      tareasRealizadas.acroField.setDefaultAppearance(newDa);
      tareasRealizadas.setFontSize(10);
      const pdfBytes = await pdfDoc.save();

      const savePdfPath = path.join(
        process.cwd(),
        "/pdfReparacion/" + reparacion.id + ".pdf",
      );

      await writeFile(savePdfPath, pdfBytes);

      this.logger.log("PDF creado exitosamente");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.logger.error(`Error en el pdf` + error);
      throw new InternalServerErrorException({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error en el pdf",
      });
    }
  }

  async getImageDanos(repairId: string): Promise<Buffer> {
    try {
      const filePath = path.join(
        process.cwd(),
        "imagesDanos",
        repairId + ".png",
      );
      this.logger.log(`Buscando imagen de daños en: ${filePath}`);

      // Verificar si el archivo existe
      await fs.promises.access(filePath, fs.constants.F_OK);

      // Leer el archivo y devolverlo como Buffer
      const fileBuffer = await fs.promises.readFile(filePath);
      this.logger.log(`✅ Imagen obtenida correctamente: ${filePath}`);
      return fileBuffer;
    } catch (error) {
      this.logger.error(
        `❌ Error al obtener la imagen para la reparación ${repairId}:`,
        error,
      );
      throw new Error(
        `No se pudo obtener la imagen para la reparación ${repairId}`,
      );
    }
  }
}
