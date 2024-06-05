import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Response,
  Session,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Config } from '../config/config';
import { CreateRoleAccessDto } from './dto/role_access.dto';
import { ToolsService } from '../tools/tools.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/docotator/public.decorator';

@Controller(`${Config.adminPath}`)
@ApiTags('账户')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly toolsService: ToolsService,
  ) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() body: LoginDto, @Req() request) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const userResult = await this.authService.validateUser(body, request);
    switch (userResult.code) {
      case 1:
        return this.authService.certificate(userResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      case 3:
        return {
          code: 400,
          msg: '验证码错误',
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @Public()
  @Get('captcha')
  @ApiOperation({ summary: '验证码' })
  async captcha(@Response() res, @Session() session) {
    const captcha = await this.toolsService.getCaptcha();
    session.captcha = captcha.text;
    res.type('image/svg+xml'); /*指定返回的类型*/
    res.send(captcha.data); /*给页面返回一张图片*/
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取个人信息' })
  async getProfile(@Req() req) {
    const { sub, username, menu, roles, roleIds, accessIds } = req.user;
    return {
      code: 200,
      data: {
        userId: sub,
        username,
        menu,
        roles,
        roleIds,
        accessIds,
      },
      msg: '请求成功',
    };
  }

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
