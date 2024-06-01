export class Config {
  //配置后台地址
  static adminPath = 'api/admin';

  //配置排除的地址
  static ignoreUrl = [
    `/${Config.adminPath}`,
    `/${Config.adminPath}/welcome`,
    `/${Config.adminPath}/login/loginOut`,
  ];
}
