import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Access } from './access.entity';
import { Role } from './role.schema';

@Entity()
export class RoleAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Access)
  @Column({ length: 11 })
  public accessId: number;

  @ManyToOne(() => Role)
  @Column({ length: 11 })
  public roleId: number;

  // @BelongsTo(() => Access)
  // public access: Access;

  // @BelongsTo(() => Role)
  // public role: Role;
}
