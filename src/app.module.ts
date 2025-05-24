import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { LoggerModule } from "@core/logger/logger.module";

import { ClienteModule } from "./contexts/cliente/cliente.module";
import { ClienteVehiculoModule } from "./contexts/cliente-vehiculo/modules/cliente-vehiculo.module";
import { ColorVehiculoModule } from "./contexts/color-vehiculo/color-vehiculo.module";
import { DanoVehiculoImageModule } from "./contexts/dano-vehiculo-image/dano-vehiculo-image.module";
import { EmpleadoModule } from "./contexts/empleado/empleado.module";
import { MarcaModule } from "./contexts/marca/marca.module";
import { PdfModule } from "./contexts/pdf/pdf.module";
import { ReparacionModule } from "./contexts/reparacion/reparacion.module";
import { TallerModule } from "./contexts/taller/taller.module";
import { TallerClienteModule } from "./contexts/taller-cliente/modules/taller-cliente.module";
import { VehiculoModule } from "./contexts/vehiculo/vehiculo.module";
import { MongoModule } from "./core/mongo/mongo.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    TallerModule,
    VehiculoModule,
    ClienteModule,
    TallerClienteModule,
    ReparacionModule,
    MongoModule,
    PdfModule,
    EmpleadoModule,
    MarcaModule,
    ColorVehiculoModule,
    ClienteVehiculoModule,
    DanoVehiculoImageModule,
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
