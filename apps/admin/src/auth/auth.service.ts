import { Access } from '@app/db/schemas/access.schema';
import { RoleAccess } from '@app/db/schemas/roleAccess.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config } from '../config/config';
import { ToolsService } from '../tools/tools.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@app/db/schemas/role.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly toolService: ToolsService,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Access.name) private accessModel: Model<Access>,
    @InjectModel(RoleAccess.name) private roleAccessModel: Model<RoleAccess>,
  ) {}

  async doAuth(body) {
    // 1、查找该用户
    const role = await this.roleModel.findOne({ _id: body.roleId });

    // 2、删除当前角色下面的所有权限
    await this.roleAccessModel.deleteMany({
      roleId: body.roleId,
    });

    // 3、把当前角色对应的所有权限增加到role_access表里面
    for (let i = 0; i < body.accessIds.length; i++) {
      // 4、查找该权限
      const access = await this.accessModel.findOne({ _id: body.accessIds[i] });
      await this.roleAccessModel.create({
        roleId: role._id,
        roleName: role.title,
        accessId: access._id,
        moduleName: access.moduleName,
        actionName: access.actionName,
      });
    }
  }

  async checkAuth(request) {
    /*
      1、获取当前用户的角色和isSuper  如果isSuper==1或者当前访问地址在忽略的权限列表中的话允许访问
      2、根据角色获取当前角色的权限列表                       
      3、获取当前访问的url 对应的权限id
      4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */

    // 1、获取当前用户的角色和isSuper
    const roles = request.user.roles;
    const isSuper = request.user.isSuper;
    const adminPath = Config.adminPath;
    const pathname = request.url; // 当前访问的地址

    // 忽略权限判断的地址
    if (Config.ignoreUrl.indexOf(pathname) != -1 || isSuper == 1) {
      return true;
    }

    // 2、根据角色获取当前角色的权限列表
    const roleAccessResult = await this.roleAccessModel.find({
      roleId: roles.map((role) => role.roleId),
    });
    const roleAccessArr = [];
    for (let i = 0; i < roleAccessResult.length; i++) {
      roleAccessArr.push(roleAccessResult[i].accessId.toString());
    }

    // 3、获取当前访问的url 对应的权限id
    const accessUrl = request.url.replace(`/${adminPath}/`, '');
    const accessUrlResult = await this.accessModel.find({
      url: accessUrl,
    });

    if (accessUrlResult.length > 0) {
      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      if (roleAccessArr.indexOf(accessUrlResult[0]._id.toString()) != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(data: any, req): Promise<any> {
    const { username, password, code } = data;

    console.log('req.session: ', req.session);
    if (
      code.toLocaleLowerCase() !== req.session?.captcha?.toLocaleLowerCase()
    ) {
      return {
        code: 3,
        user: null,
      };
    }

    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(username);
    if (user) {
      const hashedPassword = user.password;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = this.toolService.getMd5(password);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    // 1、获取当前用户的角色和isSuper
    const roles = user.roles;

    // 2、根据角色获取当前角色的权限列表
    const roleAccessArr = [];
    const roleAuthResult = await this.roleAccessModel.find({
      roleId: roles.map((role) => role.roleId),
    });
    for (let i = 0; i < roleAuthResult.length; i++) {
      roleAccessArr.push(roleAuthResult[i].accessId);
    }

    // 3、根据权限ID列表获取菜单
    const menu = await this.accessModel.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'moduleId',
          as: 'children',
          pipeline: [
            { $match: { type: { $in: [1, 2] }, _id: { $in: roleAccessArr } } },
          ],
        },
      },
      {
        $match: {
          moduleId: '0',
          _id: { $in: roleAccessArr },
        },
      },
    ]);

    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
      roleIds: user.roles.map((role) => role.roleId),
      isSuper: user.isSuper,
      menu: menu,
      accessIds: roleAccessArr,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
