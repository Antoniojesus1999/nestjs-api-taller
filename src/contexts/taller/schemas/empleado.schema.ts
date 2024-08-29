import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Empleado {
  @Prop({ required: true, trim: true })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
