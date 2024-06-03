import { ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiPropertyOptional({ example: 'nfeng' })
  username: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  code: string;
}
