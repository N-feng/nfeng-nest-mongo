import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiPropertyOptional({ description: '角色名称' })
  @IsNotEmpty({ message: '请填写角色名称' })
  title: string;

  @ApiPropertyOptional({ description: '角色描述' })
  @IsNotEmpty({ message: '请填写角色描述' })
  description: string;
}
