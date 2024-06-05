import { Access } from '@app/db/schemas/access.schema';
import { Role } from '@app/db/schemas/role.schema';
import { RoleAccess } from '@app/db/schemas/roleAccess.schema';
import { User } from '@app/db/schemas/user.schema';
import { UserRole } from '@app/db/schemas/userRole.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(UserRole.name) private userRoleModel: Model<UserRole>,
    @InjectModel(Access.name) private accessModel: Model<Access>,
    @InjectModel(RoleAccess.name) private roleAccessModel: Model<RoleAccess>,
  ) {}

  async findAll() {
    return this.userModel.aggregate([
      {
        $lookup: {
          from: 'userRole',
          localField: '_id',
          foreignField: 'userId',
          as: 'roles',
          pipeline: [
            {
              $unset: ['__v', 'isActive', 'createdAt', 'updatedAt'],
            },
          ],
        },
      },
      {
        $unset: ['password', '__v', 'isActive', 'createdAt', 'updatedAt'],
      },
    ]);
  }

  async findOne(username) {
    const u = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'userRole',
          localField: '_id',
          foreignField: 'userId',
          as: 'roles',
        },
      },
      {
        $match: {
          username,
        },
      },
    ]);
    if (!u.length) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' });
    }
    return u[0];
  }

  async getAccessById(id) {
    const userRole = await this.userRoleModel.find({
      userId: id,
    });
    const roleAccess = await this.roleAccessModel.find({
      roleId: userRole.map((item) => item.roleId),
    });
    const access = await this.accessModel.find({
      _id: roleAccess.map((item) => item.accessId),
    });
    return access;
  }

  async create(user) {
    const { username } = user;
    const u = await this.userModel.findOne({ username });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' });
    }
    return await this.userModel.create({
      ...user,
      password: user.password,
    });
  }

  async createMany(users) {
    console.log('users: ', users);
    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   users.forEach(async (user) => {
    //     await queryRunner.manager.getRepository(User).save(user);
    //   });

    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   //如果遇到错误，可以回滚事务
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   //你需要手动实例化并部署一个queryRunner
    //   await queryRunner.release();
    // }
  }

  async update(id, user) {
    // 1. 删除用户角色
    await this.userRoleModel.deleteMany({ userId: id });

    // 2.查找需要添加的角色
    const roles = await this.roleModel.find({ _id: user.roleIds });

    // 3. 添加用户角色
    for (let i = 0; i < roles.length; i++) {
      await this.userRoleModel.create({
        userId: mongoose.Types.ObjectId.createFromHexString(id),
        roleId: roles[i]._id,
        roleName: roles[i].title,
      });
    }

    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        ...user,
        password: user.password,
      },
    );
  }

  async delete(id) {
    return await this.userModel.findByIdAndDelete(id);
  }

  getModel() {
    return this.userModel;
  }
}
