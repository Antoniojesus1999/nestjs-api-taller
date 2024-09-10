import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TallerCliente, TallerClienteSchema } from "../schemas/taller-cliente.schema";
import { TallerClienteService } from "../services/taller-cliente.service";
import { TallerClienteController } from "../controllers/taller-cliente.controller";
import { ClienteModule } from "@src/contexts/cliente/cliente.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TallerCliente.name,
        schema: TallerClienteSchema,
      },
    ]),
    ClienteModule,
  ],
  providers: [TallerClienteService],
  controllers: [TallerClienteController],
})
export class TallerClienteModule {}
