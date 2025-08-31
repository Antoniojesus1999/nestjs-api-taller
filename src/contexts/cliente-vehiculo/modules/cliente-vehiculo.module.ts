import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { VehiculoModule } from "@src/contexts/vehiculo/vehiculo.module";

import { ClienteVehiculoController } from "../controllers/cliente-vehiculo.controller";
import {
  ClienteVehiculo,
  ClienteVehiculoSchema,
} from "../schemas/cliente-vehiculo.schema";
import { ClienteVehiculoService } from "../services/cliente-vehiculo.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClienteVehiculo.name,
        schema: ClienteVehiculoSchema,
      },
    ]),
    VehiculoModule,
  ],
  providers: [ClienteVehiculoService],
  controllers: [ClienteVehiculoController],
  exports: [ClienteVehiculoService],
})
export class ClienteVehiculoModule {}
