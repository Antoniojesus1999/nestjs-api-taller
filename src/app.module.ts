import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@core/logger/logger.module";

import { PdfModule } from "./contexts/pdf/pdf.module";
import { TallerModule } from "./contexts/taller/taller.module";
import { MongoModule } from "./core/mongo/mongo.module";
import { VehiculoModule } from "./contexts/vehiculo/vehiculo.module";
import { ClienteModule } from "./contexts/cliente/cliente.module";
import { ReparacionModule } from "./contexts/reparacion/reparacion.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    TallerModule,
    VehiculoModule,
    ClienteModule,
    ReparacionModule,
    MongoModule,
    PdfModule,
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer) {
    /*consumer
      .apply(AuthMiddleware)
      .exclude(
        //{ path: 'cats', method: RequestMethod.GET },
        // { path: 'cats', method: RequestMethod.POST },
        "cats/(.*)",
      )

      .forRoutes(ClienteController);*/
  }
}
