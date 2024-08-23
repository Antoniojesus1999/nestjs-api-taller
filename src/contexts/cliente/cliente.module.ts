import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ClienteController } from "./cliente.controller";
import { ClienteService } from "./cliente.service";
import { Cliente, ClienteSchema } from "./schemas/cliente.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cliente.name,
        schema: ClienteSchema,
      },
    ]),
  ],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
