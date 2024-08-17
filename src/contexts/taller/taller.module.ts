import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TallerController } from "./taller.controller";
import { TallerService } from "./taller.service";
import { Taller, TallerSchema } from "./schemas/taller.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Taller.name,
        schema: TallerSchema,
      },
    ]),
  ],
  providers: [TallerService],
  controllers: [TallerController],
})

export class TallerModule {}
