import { Photo } from './photo.entity';
import { Role } from './role.entity';
import { UserRole } from './userRole.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  sex: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  isSuper: number;

  @OneToMany(() => Photo, (photo) => photo.userId)
  photos: Photo[];

  @OneToMany(() => Role, () => UserRole)
  roles: Role[];
}
