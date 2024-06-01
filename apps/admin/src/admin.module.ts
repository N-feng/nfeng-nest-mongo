import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ToolsService } from './tools/tools.service';
import { UserService } from './user/user.service';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [ToolsService, UserService],
})
export class AdminModule {}
