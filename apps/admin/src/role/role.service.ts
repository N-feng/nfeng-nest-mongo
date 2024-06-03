import { Access } from '@app/db/schemas/access.entity';
import { Role } from '@app/db/schemas/role.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findAll() {
    return await this.roleModel.find({
      // include: [Access],
    });
  }

  async findOne(id) {
    const u = await this.roleModel.findOne({
      where: { id },
      include: [Access],
    });
    if (!u) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' });
    }
    return u;
  }

  async create(user) {
    const { title } = user;
    const u = await this.roleModel.findOne({ where: { title } });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' });
    }
    return await this.roleModel.create(user);
  }

  async update(id, user) {
    return await this.roleModel.findByIdAndUpdate({ _id: id }, user);
  }

  async delete(id) {
    return await this.roleModel.findByIdAndDelete(id);
  }

  getModel() {
    return this.roleModel;
  }
}
