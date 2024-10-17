import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { useContainer } from "class-validator";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");
  const ipServer = configService.get<string>("IP_SERVER", "172.0.0.5");

  // Configurar el uso de ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Habilitar la transformación automática de DTOs
      whitelist: true, // Eliminar propiedades no declaradas en los DTOs
      forbidNonWhitelisted: true, // Lanzar un error si se encuentran propiedades no declaradas
    }),
  );

  // Configurar class-validator para usar el contenedor de NestJS
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, ipServer);

  const logger = app.get(Logger);
  logger.log(`App is ready and listening ip ${ipServer} on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
}

process.on("uncaughtException", handleError);
