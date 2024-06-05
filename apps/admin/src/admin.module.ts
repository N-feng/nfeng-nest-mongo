import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ToolsService } from './tools/tools.service';
import { UserService } from './user/user.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { AccessService } from './access/access.service';
import { AccessController } from './access/access.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AuthGuard } from './common/guard/auth.guard';

@Module({
  imports: [CommonModule],
  controllers: [
    UserController,
    RoleController,
    AccessController,
    AuthController,
  ],
  providers: [
    ToolsService,
    UserService,
    RoleService,
    AccessService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AdminModule {}
