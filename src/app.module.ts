import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";

import { ClientModule } from "./contexts/client/client.module";
import { MongoModule } from "./core/mongo/mongo.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    ClientModule,
    MongoModule,
  ],
})
export class AppModule {}
