import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EmpleadoModule } from "../empleado/empleado.module";
import { Taller, TallerSchema } from "./schemas/taller.schema";
import { TallerController } from "./taller.controller";
import { TallerService } from "./taller.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Taller.name,
        schema: TallerSchema,
      },
    ]),
    EmpleadoModule,
  ],
  providers: [TallerService],
  controllers: [TallerController],
})
export class TallerModule {}
