import mongoose from 'mongoose';
import { Role } from './role.schema';
import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UserRole {
  @Prop({ length: 11, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  // @BelongsTo(() => UserModel)
  // public user: UserModel;

  @Prop({ length: 11, type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  roleId: Role;

  // @BelongsTo(() => Role)
  // public role: Role;

  @Prop()
  roleName: string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
