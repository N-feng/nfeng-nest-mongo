import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.schema';
import mongoose from 'mongoose';
import { Photo } from './photo.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ nullable: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  mobile: string;

  @Prop()
  email: string;

  @Prop()
  sex: string;

  @Prop()
  age: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  isSuper: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }] })
  photos: Photo[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
