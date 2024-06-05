import { Injectable } from '@nestjs/common';
import * as md5 from 'md5'; // MD5加密
import svgCaptcha = require('svg-captcha');

@Injectable()
export class ToolsService {
  async getCaptcha() {
    //生成图形验证码
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 120,
      height: 32,
      background: '#cc9966',
    });

    return captcha;
  }

  getMd5(str: string) {
    return md5(str);
  }
}
