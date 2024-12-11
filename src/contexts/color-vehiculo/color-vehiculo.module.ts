import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ColorVehiculoController } from "./color-vehiculo.controller";
import { ColorVehiculoService } from "./color-vehiculo.service";
import {
  ColorVehiculo,
  ColorVehiculoSchema,
} from "./schemas/color-vehiculo.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ColorVehiculo.name,
        schema: ColorVehiculoSchema,
      },
    ]),
  ],
  providers: [ColorVehiculoService],
  controllers: [ColorVehiculoController],
})
export class ColorVehiculoModule {}
