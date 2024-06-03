import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Config } from '../config/config';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/access.dto';

@Controller(`${Config.adminPath}/access`)
@ApiTags('权限')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('findAll')
  @ApiOperation({ summary: '权限列表' })
  async findAll(@Query() query) {
    // 分页 搜索商品数据
    const { keyword } = query;
    // 条件
    let json = {};
    if (keyword) {
      json = Object.assign(json, { title: { $regex: new RegExp(keyword) } });
    }

    // const page = query.page || 1;
    // const pageSize = 3;
    // const skip = (page - 1) * pageSize;
    // const result = await this.accessService.find(json, skip, pageSize);
    //1、在access表中找出  moduleId=0的数据
    //2、让access表和access表关联    条件：找出access表中moduleId等于_id的数据
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'moduleId',
          as: 'children',
        },
      },
      {
        $match: {
          moduleId: '0',
        },
      },
    ]);

    const count = await this.accessService.count(json);

    // const totalPages = Math.ceil(count / pageSize);

    return {
      code: 200,
      // data: { list: goodsResult, page, totalPages, keyword },
      data: result,
      success: true,
      total: count,
    };

    // const { list, total } = await this.accessService.find(body);
    // return { code: 200, data: list, success: true, total };
  }

  @Post('create')
  @ApiOperation({ summary: '创建权限' })
  async create(@Body() body: CreateAccessDto) {
    await this.accessService.create(body);
    return { code: 200, data: {} };
  }

  @Put('update/:id')
  @ApiOperation({ summary: '更新权限' })
  async update(@Param('id') id: string, @Body() body: CreateAccessDto) {
    await this.accessService.update(id, body);
    return { code: 200, data: {} };
  }

  @Delete('remove')
  @ApiOperation({ summary: '删除权限' })
  async remove(@Query('id') id: any) {
    await this.accessService.delete(id);
    return { code: 200, data: {} };
  }
}
