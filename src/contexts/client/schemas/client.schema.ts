import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Vehicle } from "./vehicle.schema";

@Schema({ collection: "clients", timestamps: true })
export class Client extends Document {
  @Prop({ trim: true })
  name: string;
  @Prop({ required: true, trim: true })
  nif: string;
  @Prop({ trim: true })
  surName1: string;
  @Prop({ trim: true })
  surName2: string;
  @Prop({ trim: true })
  tlfn: string;
  @Prop({ required: true, trim: true })
  email: string;
  @Prop()
  cars: [Vehicle];

  constructor(
    name: string,
    nif: string,
    surName1: string,
    surName2: string,
    tlfn: string,
    email: string,
    cars: [Vehicle],
  ) {
    super();
    this.name = name;
    this.nif = nif;
    this.surName1 = surName1;
    this.surName2 = surName2;
    this.tlfn = tlfn;
    this.email = email;
    this.cars = cars;
  }
}

export const ClientSchema = SchemaFactory.createForClass(Client);
