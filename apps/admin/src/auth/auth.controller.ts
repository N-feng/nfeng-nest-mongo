import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Config } from '../config/config';
import { CreateRoleAccessDto } from './dto/role_access.dto';
import { ToolsService } from '../tools/tools.service';
import { AuthService } from './auth.service';

@Controller(`${Config.adminPath}`)
@ApiTags('账户')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('doAuth')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新账户权限' })
  async doAuth(@Body() body: CreateRoleAccessDto) {
    await this.authService.doAuth(body);
    return {
      code: 200,
      data: {},
      msg: `授权成功`,
    };
  }
}
