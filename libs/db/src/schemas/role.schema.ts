import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Role extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  // @OneToMany(() => Access, () => RoleAccess)
  // access: Access[];
}
