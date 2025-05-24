import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ReparacionController } from "./reparacion.controller";
import { ReparacionService } from "./reparacion.service";
import { Reparacion, ReparacionSchema } from "./schemas/reparacion.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reparacion.name,
        schema: ReparacionSchema,
      },
    ]),
  ],
  providers: [ReparacionService],
  controllers: [ReparacionController],
  exports: [ReparacionService],
})
export class ReparacionModule {}
