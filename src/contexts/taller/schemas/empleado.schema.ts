import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "empleados", timestamps: true })
export class Empleado extends Document {
  @Prop({ unique: true, trim: true })
  /*@Prop({
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    default: null,
  })*/
  email: string;
  @Prop({ trim: true })
  photoUrl: string;
  @Prop({ trim: true })
  displayName: string;
  @Prop({ trim: true })
  provider: string;
  @Prop({ unique: true, trim: true })
  uid: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    email: string,
    photoUrl: string,
    displayName: string,
    provider: string,
    uid: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.email = email;
    this.photoUrl = photoUrl;
    this.displayName = displayName;
    this.provider = provider;
    this.uid = uid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
//EmpleadoSchema.index({ email: 1 }, { unique: true, sparse: true });
