import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Role {
  @Prop()
  title: string;

  @Prop()
  description: string;

  // @OneToMany(() => Access, () => RoleAccess)
  // access: Access[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
