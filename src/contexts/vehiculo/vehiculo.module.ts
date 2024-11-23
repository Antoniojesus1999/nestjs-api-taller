import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Vehiculo, VehiculoSchema } from "./schemas/vehiculo.schema";
import { VehiculoController } from "./vehiculo.controller";
import { VehiculoService } from "./vehiculo.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehiculo.name,
        schema: VehiculoSchema,
      },
    ]),
  ],
  providers: [VehiculoService],
  controllers: [VehiculoController],
})
export class VehiculoModule {}
