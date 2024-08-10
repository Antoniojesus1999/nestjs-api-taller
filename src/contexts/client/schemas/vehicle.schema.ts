import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Repair, RepairSchema } from "./repair.schema";

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ trim: true })
  model: string;

  @Prop({ trim: true })
  brand: string;

  @Prop({ trim: true })
  registration: string;

  @Prop()
  fuel: number;

  @Prop()
  km: number;

  @Prop({ trim: true })
  insurance: string;

  @Prop({ trim: true })
  chassis: string;

  @Prop({ trim: true })
  poliza: string;

  @Prop({ type: [RepairSchema] })
  repairs: Repair[];

  constructor(
    model: string,
    brand: string,
    registration: string,
    fuel: number,
    km: number,
    insurance: string,
    chassis: string,
    poliza: string,
    repairs: [Repair],
  ) {
    this.model = model;
    this.brand = brand;
    this.registration = registration;
    this.fuel = fuel;
    this.km = km;
    this.insurance = insurance;
    this.chassis = chassis;
    this.poliza = poliza;
    this.repairs = repairs;
  }
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
