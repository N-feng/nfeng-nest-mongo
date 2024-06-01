import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { User, UserSchema } from './schemas/user.schema';
// import { Role } from './schemas/role.entity';
// import { Access } from './schemas/access.entity';
// import { UserRole } from './schemas/userRole.entity';
// import { RoleAccess } from './schemas/roleAccess.entity';
// import { Photo } from './schemas/photo.entity';
import { MongooseModule } from '@nestjs/mongoose';

const models = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema, collection: 'user' },
  // User,
  // Role,
  // Access,
  // UserRole,
  // RoleAccess,
  // Photo,
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
