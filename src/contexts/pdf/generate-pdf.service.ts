/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from "node:fs";
import path from "node:path";

import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import * as Handlebars from "handlebars";
import * as puppeteer from "puppeteer";

import { ReparacionDto } from "../reparacion/dtos/reparacion.dto";

@Injectable()
export class GeneratePdfService {
  constructor(private readonly logger: Logger) {}

  async generatePdf(reparacion: ReparacionDto): Promise<void> {
    this.logger.log(`valor de proces cwd ${process.cwd()}`);
    const pdfData = fs.readFileSync(
      process.cwd() + "/src/resources/plantilla-gavira.html",
      "utf8",
    );
    // 2. Compila la plantilla con Handlebars
    const template = Handlebars.compile(pdfData);
    const htmlRelleno = template({
      ...reparacion,
      imagenDanos: await this.getImageDanos(reparacion.id), // o la ruta de la imagen
    });

    // 3. Genera el PDF con Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlRelleno, { waitUntil: "networkidle0" });
    await page.pdf({
      path: "pdfReparacion/" + reparacion.id + ".pdf",
      format: "A4",
    });
    await browser.close();
  }

  async getImageDanos(repairId: string): Promise<string> {
    const filePath = path.join(process.cwd(), "imagesDanos", repairId + ".png");
    this.logger.log(`Buscando imagen de daños en: ${filePath}`);

    try {
      // Verificar si el archivo existe
      await fs.promises.access(filePath, fs.constants.F_OK);

      // Leer el archivo y devolverlo como Buffer
      const fileBuffer = await fs.promises.readFile(filePath);
      this.logger.log(`✅ Imagen obtenida correctamente: ${filePath}`);
      return fileBuffer.toString("base64");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        const mensaje = `Imagen para el id de reparación ${repairId} no encontrada`;
        this.logger.warn(`⚠️ ${mensaje}`);
        throw new NotFoundException(mensaje);
      }
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
