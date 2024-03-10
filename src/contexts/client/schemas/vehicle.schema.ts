import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Repair } from "./repair.schema";

@Schema()
export class Vehicle {
  @Prop({ trim: true })
  model: string;

  @Prop({ trim: true })
  brand: string;

  @Prop({ trim: true })
  registration: string;

  @Prop()
  repairs: [Repair];

  constructor(
    model: string,
    brand: string,
    registration: string,
    repairs: [Repair],
  ) {
    this.model = model;
    this.brand = brand;
    this.registration = registration;
    this.repairs = repairs;
  }
}

export const ClientSchema = SchemaFactory.createForClass(Vehicle);
