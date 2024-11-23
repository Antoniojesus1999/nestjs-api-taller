import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TallerClienteController } from "../controllers/taller-cliente.controller";
import {
  TallerCliente,
  TallerClienteSchema,
} from "../schemas/taller-cliente.schema";
import { TallerClienteService } from "../services/taller-cliente.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TallerCliente.name,
        schema: TallerClienteSchema,
      },
    ]),
  ],
  providers: [TallerClienteService],
  controllers: [TallerClienteController],
  exports: [TallerClienteService],
})
export class TallerClienteModule {}
