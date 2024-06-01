import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Access } from './entities/access.entity';
import { UserRole } from './entities/userRole.entity';
import { RoleAccess } from './entities/roleAccess.entity';
import { Photo } from './entities/photo.entity';

const models = TypeOrmModule.forFeature([
  User,
  Role,
  Access,
  UserRole,
  RoleAccess,
  Photo,
]);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        host: process.env.DB_HOST,
        port: 27017,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User, Role, Access, UserRole, RoleAccess, Photo],
        synchronize: true,
      }),
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
