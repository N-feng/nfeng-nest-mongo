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

@Module({
  imports: [CommonModule],
  controllers: [UserController, RoleController, AccessController, AuthController],
  providers: [ToolsService, UserService, RoleService, AccessService, AuthService],
})
export class AdminModule {}
