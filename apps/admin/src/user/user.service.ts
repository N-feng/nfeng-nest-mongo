import { User } from '@app/db/schemas/user.schema';
import { UserRole } from '@app/db/schemas/userRole.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserRole.name) private userRoleModel: Model<UserRole>,
    // @InjectRepository(RoleAccessEntity)
    // private roleAccessRepository: Repository<RoleAccessEntity>,
    // @InjectRepository(AccessEntity)
    // private accessRepository: Repository<AccessEntity>,
    // private sequelize: Sequelize,
  ) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOne(username) {
    const u = await this.userModel.findOne({
      where: { username },
      // include: [PhotoModel, Role],
    });
    if (!u) {
      throw new BadRequestException({ code: 400, msg: '找不到用户' });
    }
    return u;
  }

  async getAccessById(id) {
    return id;
    // const userRole = await this.userRoleRepository.find({
    //   where: { userId: id },
    // });
    // const roleAccess = await this.roleAccessRepository.find({
    //   where: {
    //     roleId: userRole.map((item) => item.roleId),
    //   },
    //   include: [Access],
    // });
    // const access = await this.accessRepository.find({
    //   where: {
    //     id: roleAccess.map((item) => item.accessId),
    //   },
    // });
    // return access;
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

    // 2. 添加用户角色
    for (let i = 0; i < user.roleIds.length; i++) {
      await this.userRoleModel.create({
        userId: mongoose.Types.ObjectId.createFromHexString(id),
        roleId: mongoose.Types.ObjectId.createFromHexString(user.roleIds[i]),
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
}
