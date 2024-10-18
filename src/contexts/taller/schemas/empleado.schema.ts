import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Empleado {
  @Prop({ trim: true })
  email: string;
  @Prop({ trim: true })
  photoUrl: string;
  @Prop({ trim: true })
  displayName: string;
  @Prop({ trim: true })
  provider: string;
  @Prop({ trim: true })
  uid: string;

  constructor(
    email: string,
    photoUrl: string,
    displayName: string,
    provider: string,
    uid: string,
  ) {
    this.email = email;
    this.photoUrl = photoUrl;
    this.displayName = displayName;
    this.provider = provider;
    this.uid = uid;
  }
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
