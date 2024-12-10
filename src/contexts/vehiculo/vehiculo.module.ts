import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ClienteVehiculoModule } from "../cliente-vehiculo/modules/cliente-vehiculo.module";
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
    ClienteVehiculoModule,
  ],
  providers: [VehiculoService],
  controllers: [VehiculoController],
})
export class VehiculoModule {}
