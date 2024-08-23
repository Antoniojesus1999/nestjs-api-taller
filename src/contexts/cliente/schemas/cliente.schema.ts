import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Cliente {
  @Prop({ required: true, trim: true, unique: true })
  nif: string;
  @Prop({ trim: true })
  name: string;
  @Prop({ trim: true })
  surName1: string;
  @Prop({ trim: true })
  surName2: string;
  @Prop({ trim: true })
  tlfn: string;
  @Prop({ required: true, trim: true })
  email: string;

  constructor(
    name: string,
    nif: string,
    surName1: string,
    surName2: string,
    tlfn: string,
    email: string,
  ) {
    this.name = name;
    this.nif = nif;
    this.surName1 = surName1;
    this.surName2 = surName2;
    this.tlfn = tlfn;
    this.email = email;
  }
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
