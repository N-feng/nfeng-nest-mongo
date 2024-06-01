import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({ description: '用户名称', example: 'nfeng' })
  @IsString()
  username: string;

  @ApiPropertyOptional({ description: '用户密码', example: '123' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ description: '用户电话', example: '13802727080' })
  @IsString()
  mobile: string;

  @ApiPropertyOptional({ description: '用户邮箱', example: '308561157@qq.com' })
  @IsString()
  email: string;

  // @ApiPropertyOptional({ description: '用户角色', example: [1, 2, 3] })
  // @IsArray()
  // @ArrayMinSize(1)
  // roleIds: number[];
}
