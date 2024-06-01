import { User } from '@app/db/entities/user.entity';
import { UserRole } from '@app/db/entities/userRole.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    // @InjectRepository(RoleAccessEntity)
    // private roleAccessRepository: Repository<RoleAccessEntity>,
    // @InjectRepository(AccessEntity)
    // private accessRepository: Repository<AccessEntity>,
    // private sequelize: Sequelize,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      // include: [PhotoModel, Role],
      select: {
        username: true,
      },
    });
  }

  async findOne(username) {
    const u = await this.usersRepository.findOne({
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
    const u = await this.usersRepository.findOne({ where: { username } });

    if (u) {
      throw new BadRequestException({ code: 400, msg: '用户已经注册' });
    }
    return await this.usersRepository.create({
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
    await this.userRoleRepository.delete(id);

    // 2. 添加用户角色
    for (let i = 0; i < user.roleIds.length; i++) {
      await this.userRoleRepository.create({
        userId: id,
        roleId: user.roleIds[i],
      });
    }

    return await this.usersRepository.update(
      { id },
      {
        ...user,
        password: user.password,
      },
    );
  }

  async delete(id) {
    return await this.usersRepository.delete(id);
  }
}
