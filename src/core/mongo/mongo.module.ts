/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoAgregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async () => ({
        uri: process.env.URL_MONGO,
        connectionFactory: connection => {
          connection.plugin(mongoosePaginate);
          connection.plugin(mongoAgregatePaginate);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return connection;
        },
      }),
    }),
  ],
})
export class MongoModule {}
