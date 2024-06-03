import { RoleAccess } from '@app/db/schemas/roleAccess.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(RoleAccess.name) private roleAccessModel: Model<RoleAccess>,
  ) {}

  async doAuth(body) {
    const { accessIds } = body;
    const roleId = mongoose.Types.ObjectId.createFromHexString(body.roleId);

    // 1、删除当前角色下面的所有权限
    await this.roleAccessModel.deleteMany({
      roleId,
    });

    // 2、把当前角色对应的所有权限增加到role_access表里面
    for (let i = 0; i < accessIds.length; i++) {
      await this.roleAccessModel.create({
        roleId,
        accessId: mongoose.Types.ObjectId.createFromHexString(accessIds[i]),
      });
    }
  }
}
