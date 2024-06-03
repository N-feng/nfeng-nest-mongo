import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateRoleAccessDto {
  @ApiPropertyOptional({ description: '角色ID' })
  @IsNumber()
  roleId: number;

  @ApiPropertyOptional({ description: '授权节点' })
  @IsArray()
  accessIds: number[];
}
