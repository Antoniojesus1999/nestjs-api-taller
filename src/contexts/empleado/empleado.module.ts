import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Empleado, EmpleadoSchema } from "../taller/schemas/empleado.schema";
import { EmpleadoService } from "./empleado..service";
import { EmpleadoController } from "./empleado.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Empleado.name,
        schema: EmpleadoSchema,
      },
    ]),
  ],
  providers: [EmpleadoService],
  controllers: [EmpleadoController],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}
