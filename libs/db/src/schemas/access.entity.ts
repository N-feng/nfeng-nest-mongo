import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() // 设置表名称
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moduleName: string; // 模版名称

  @Column()
  type: number; // 节点类型：1、表示模块 2、表示菜单 3、表示操作

  @Column()
  actionName: string; // 操作名称

  @Column()
  url: string; // 跳转地址

  @ManyToOne(() => Access)
  @JoinColumn()
  moduleId: number; // module_id 和 id 关联 moduleId = 0 表示模块

  @Column()
  sort: number; // 排序

  @Column({ nullable: true })
  description: string; // 描述

  @Column()
  status: number; // 状态

  @CreateDateColumn()
  createdAt: Date; // 增加时间

  // @HasMany(() => Access)
  // access: Access[];
}
