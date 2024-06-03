import { Access } from '@app/db/schemas/access.entity';
import { RoleAccess } from '@app/db/schemas/roleAccess.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel(Access.name) private accessModel: Model<Access>,
    @InjectModel(RoleAccess.name) private roleAccessModel: Model<RoleAccess>,
  ) {}

  async find(body?, skip = 0, limit = 0, fields?: string) {
    return await this.accessModel.find(body, fields).skip(skip).limit(limit);
  }

  async count(body?) {
    return (await this.accessModel.find(body)).length;
  }

  async create(body) {
    const { moduleId } = body;
    if (moduleId != '0') {
      body.moduleId = mongoose.Types.ObjectId.createFromHexString(moduleId);
    }
    return await this.accessModel.create(body);
  }

  async update(id, body) {
    return await this.accessModel.findByIdAndUpdate({ _id: id }, body);
  }

  async delete(id) {
    return await this.accessModel.findByIdAndDelete(id);
  }

  getModel() {
    return this.accessModel;
  }
}
