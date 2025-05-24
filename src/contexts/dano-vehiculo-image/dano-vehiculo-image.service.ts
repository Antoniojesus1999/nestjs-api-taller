import { promises as fs } from "node:fs";
import { join } from "node:path";

import { Injectable, Logger } from "@nestjs/common";

import { UpdateDanoVehiculoImageDto } from "./dto/update-dano-vehiculo-image.dto";

@Injectable()
export class DanoVehiculoImageService {
  private readonly logger = new Logger(DanoVehiculoImageService.name);

  private readonly uploadPath = process.cwd() + "/imagesDanos";

  async saveImage(image: { fileName: string; buffer: Buffer }) {
    this.logger.log("save service ", image);
    try {
      await fs.mkdir(this.uploadPath, { recursive: true }); // Crea la carpeta si no existe
      const filePath = join(this.uploadPath, image.fileName);
      await fs.writeFile(filePath, image.buffer);
      this.logger.log(`✅ Imagen guardada en: ${filePath}`);
    } catch (error) {
      this.logger.error("❌ Error al guardar la imagen:", error);
      throw new Error("No se pudo guardar la imagen");
    }
  }

  findAll() {
    return `This action returns all danoVehiculoImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} danoVehiculoImage`;
  }

  update(id: number, updateDanoVehiculoImageDto: UpdateDanoVehiculoImageDto) {
    this.logger.log("update service ", updateDanoVehiculoImageDto);

    return `This action updates a #${id} danoVehiculoImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} danoVehiculoImage`;
  }
}
