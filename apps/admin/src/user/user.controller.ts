import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Config } from '../config/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ToolsService } from '../tools/tools.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/users.dto';

@Controller(`${Config.adminPath}/user`)
@ApiBearerAuth()
@ApiTags('用户')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly toolsService: ToolsService,
  ) {}

  @Post('findAll')
  @ApiOperation({ summary: '用户列表' })
  async findAll() {
    const result = await this.userService.findAll();
    console.log('result: ', result);
    return { code: 200, data: { list: result } };
    // const list = result.map((item) => {
    //   return {
    //     ...item.toJSON(),
    //     password: '',
    //     roleIds: item.roles.map((role) => role.id),
    //   };
    // });
    // return {
    //   code: 200,
    //   data: { list },
    // };
  }

  @Get('findOne/:id')
  @ApiOperation({ summary: '查询用户' })
  async findOne(@Query('username') username: string = 'nfeng') {
    const { age, email, mobile, password, sex, id } =
      await this.userService.findOne(username);
    const access = await this.userService.getAccessById(id);
    return {
      code: 200,
      data: { age, email, mobile, password, sex, username, access },
    };
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() body: CreateUserDto) {
    const password = this.toolsService.getMd5(body.password);
    const newParam = { ...body, password, status: true };
    await this.userService.create(newParam);
    return { code: 200, data: {} };
  }

  @Post('/many')
  @ApiOperation({ summary: '批量创建用户' })
  async createMany(@Body() users) {
    const newUsers = users.map((user) => ({ ...user, status: true }));
    await this.userService.createMany(newUsers);
    return { code: 200, data: {} };
  }

  @Put('update/:id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: '编辑用户' })
  async update(@Param('id') id: string, @Body() body: CreateUserDto) {
    const password = this.toolsService.getMd5(body.password);
    await this.userService.update(id, { ...body, password });
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Query('id') id: string) {
    await this.userService.delete(id);
    return { code: 200, data: {} };
  }
}
