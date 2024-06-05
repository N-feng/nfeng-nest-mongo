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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Config } from '../config/config';
import { CreateRoleDto } from './dto/role.dto';

@Controller(`${Config.adminPath}/role`)
@ApiTags('角色')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('findAll')
  @ApiOperation({ summary: '角色列表' })
  async findAll() {
    const result = await this.roleService.findAll();
    return { code: 200, data: { list: result } };
  }

  @Get('findOne')
  @ApiOperation({ summary: '查询角色' })
  async findOne(@Query('id') id: string) {
    const user = await this.roleService.findOne(id);
    return { code: 200, data: user };
  }

  @Post('create')
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() body: CreateRoleDto) {
    await this.roleService.create(body);
    return { code: 200, data: {} };
  }

  @Put('update/:id')
  @ApiOperation({ summary: '编辑角色' })
  async update(@Param('id') id: string, @Body() body: CreateRoleDto) {
    await this.roleService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除角色' })
  async remove(@Query('id') id: string) {
    await this.roleService.delete(id);
    return { code: 200, data: {} };
  }
}
