// import { ProductModel } from './product.model';
// import { SettingModel } from './setting.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.schema';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  uid: number;

  @ManyToOne(() => User)
  @Column()
  userId: number;

  // @BelongsTo(() => UserModel)
  // user: UserModel;

  // @ForeignKey(() => ProductModel)
  // @Column
  // productId: number;

  // @BelongsTo(() => ProductModel)
  // product: ProductModel;

  // @ForeignKey(() => SettingModel)
  // @Column
  // settingId: number;

  // @BelongsTo(() => SettingModel)
  // setting: SettingModel;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  percent: number;

  @Column()
  thumbUrl: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
