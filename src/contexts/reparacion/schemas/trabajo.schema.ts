import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Trabajo {
  @Prop({ required: true, trim: true })
  descripcion: string;

  constructor(descripcion: string) {
    this.descripcion = descripcion;
  }
}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);
