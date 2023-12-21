import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
export type AuthDocument = Auth & Document;
@Schema({
  timestamps: true,
})
export class Auth {
  @Prop()
  name: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;
  @Prop()
  password: string;
}
export const AuthModel = SchemaFactory.createForClass(Auth);
