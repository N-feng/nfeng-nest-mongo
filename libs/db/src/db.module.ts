import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { User, UserSchema } from './schemas/user.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { Access, AccessSchema } from './schemas/access.entity';
import { RoleAccess, RoleAccessSchema } from './schemas/roleAccess.entity';
import { Photo, PhotoSchema } from './schemas/photo.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRole, UserRoleSchema } from './schemas/userRole.entity';

const models = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema, collection: 'user' },
  { name: Role.name, schema: RoleSchema, collection: 'role' },
  { name: Access.name, schema: AccessSchema, collection: 'access' },
  { name: UserRole.name, schema: UserRoleSchema, collection: 'userRole' },
  { name: RoleAccess.name, schema: RoleAccessSchema, collection: 'roleAccess' },
  { name: Photo.name, schema: PhotoSchema, collection: 'photo' },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB,
        useUnifiedTopology: true,
      }),
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
