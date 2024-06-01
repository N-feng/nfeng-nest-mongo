import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.schema';
import { User } from './user.schema';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Column({ length: 11 })
  public userId: number;

  // @BelongsTo(() => UserModel)
  // public user: UserModel;

  @ManyToOne(() => Role)
  @Column({ length: 11 })
  public roleId: number;

  // @BelongsTo(() => Role)
  // public role: Role;
}
