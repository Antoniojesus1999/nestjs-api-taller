import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MarcaController } from "./marca.controller";
import { MarcaService } from "./marca.service";
import { Marca, MarcaSchema } from "./schemas/marca.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Marca.name,
        schema: MarcaSchema,
      },
    ]),
  ],
  providers: [MarcaService],
  controllers: [MarcaController],
})
export class MarcaModule {}
