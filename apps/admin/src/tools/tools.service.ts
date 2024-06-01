import { Injectable } from '@nestjs/common';
import * as md5 from 'md5'; // MD5加密

@Injectable()
export class ToolsService {
  getMd5(str: string) {
    return md5(str);
  }
}
