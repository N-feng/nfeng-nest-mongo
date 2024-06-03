import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
}) // 设置表名称
export class Access {
  @Prop()
  moduleName: string; // 模版名称

  @Prop()
  type: number; // 节点类型：1、表示模块 2、表示菜单 3、表示操作

  @Prop()
  actionName: string; // 操作名称

  @Prop()
  url: string; // 跳转地址

  @Prop({ type: mongoose.Schema.Types.Mixed })
  moduleId; // module_id 和 id 关联 moduleId = 0 表示模块

  @Prop()
  sort: number; // 排序

  @Prop({ nullable: true })
  description: string; // 描述

  @Prop()
  status: number; // 状态

  // @HasMany(() => Access)
  // access: Access[];
}

export const AccessSchema = SchemaFactory.createForClass(Access);
