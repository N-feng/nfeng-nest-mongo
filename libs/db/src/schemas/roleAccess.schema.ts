import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Access } from './access.schema';
import { Role } from './role.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class RoleAccess {
  @Prop({ length: 11, type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  roleId: Role;

  @Prop()
  roleName: string;

  // @BelongsTo(() => Access)
  // public access: Access;

  // @BelongsTo(() => Role)
  // public role: Role;

  @Prop({ length: 11, type: mongoose.Schema.Types.ObjectId, ref: 'Access' })
  accessId: Access;

  @Prop()
  moduleName: string;

  @Prop()
  actionName: string;
}

export const RoleAccessSchema = SchemaFactory.createForClass(RoleAccess);
