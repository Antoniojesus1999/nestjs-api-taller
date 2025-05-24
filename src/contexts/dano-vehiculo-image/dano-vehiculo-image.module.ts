import { Module } from "@nestjs/common";

import { DanoVehiculoImageController } from "./dano-vehiculo-image.controller";
import { DanoVehiculoImageService } from "./dano-vehiculo-image.service";

@Module({
  controllers: [DanoVehiculoImageController],
  providers: [DanoVehiculoImageService],
})
export class DanoVehiculoImageModule {}
