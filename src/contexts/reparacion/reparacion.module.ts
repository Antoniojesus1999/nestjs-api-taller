import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Reparacion, ReparacionSchema } from "./schemas/reparacion.schema";
import { ReparacionService } from "./reparacion.service";
import { ReparacionController } from "./reparacion.controller";



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
})
export class ReparacionModule {}
