import http from '../api/http';

export default {
  /**
   * 公共
  */
  getRouters:http('/getRouters','get'),

  /**
   * 登录相关接口
  */
  userLogin: http('/api/user', 'post'),
  getUserInfo: http('/api/user/info', 'get'),
  userLogout:http('/api/user/logout', 'post'),

  /**
   * 系统相关 👇
  */
  /**
   * 角色管理
  */
  // 获取角色列表
  getRoleList:http('...','get'),
  // 获取角色权限菜单列表
  getRoleMenuTree:http('...','get'),
  // 新增/修改角色提交
  submitRole:http('...','post'),
  // 删除角色
  deleteRole:http('...','post'),
  // 修改角色状态
  changeRoleStatus:http('...','post'),
  // 取消用户角色授权
  authUserCancel:http('...','post'),
  // 批量取消用户角色授权
  authUserCancelAll:http('...','post'),
  // 获取角色分配用户列表
  allocatedUserList:http('...','post'),
  // 角色分配提交授权用户
  authUserSelectAll:http('...','post'),
  // 获取角色未授权用户列表
  unallocatedUserList:http('...','get'),

  /**
   * 菜单管理
  */
  // 获取菜单列表
  listMenu:http('...','get'),
  // 获取菜单详细
  getMenu:http('...','get'),
  // 删除菜单
  delMenu:http('...','post'),
  // 修改菜单
  updateMenu:http('...','post'),
  // 新增菜单
  addMenu:http('...','post'),

  /**
   * 用户管理
  */
  // 获取用户详细
  getUser:http('...','get'),
  // 删除用户
  delUser:http('...','post'),
  // 用户密码重置
  resetUserPwd:http('...','post'),
  // 查询授权角色
  getAuthRole:http('...','get'),
  // 保存授权角色
  updateAuthRole:http('...','post'),
  // 查询用户列表
  listUser:http('...','get'),
  userUploadApi:http('...','post'),
}