import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Photo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

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

  @Prop()
  url: string;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  percent: number;

  @Prop()
  thumbUrl: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
