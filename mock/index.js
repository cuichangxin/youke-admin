import { failResponseWrap, successResponseWrap } from './help'
import { admin_data, test_data } from './data/menu';

const admin_user = {
  userId: 1,
  username: "admin",
  password: "admin123",
  token: 'admin-token',
  permissions: ["*:*:*"],
  roles: ["admin"],
  user: {
    "createBy": "admin",
    "createTime": "2023-04-23 16:11:38",
    "updateBy": null,
    "updateTime": null,
    "remark": "管理员",
    "userId": 1,
    "deptId": 103,
    "userName": "admin",
    "nickName": "若依",
    "email": "ry@163.com",
    "phonenumber": "15888888888",
    "sex": "1",
    "avatar": "https://pic.ziyuan.wang/user/guest/2024/03/803e2200d0cda549256f733a47fcba7d_fc259859dac73.jpeg",
    "password": "admin123",
    "status": "0",
    "delFlag": "0",
    "loginIp": "113.87.130.73",
    "loginDate": "2024-03-01T15:49:32.000+08:00",
    "dept": {
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "deptId": 103,
      "parentId": 101,
      "ancestors": "0,100,101",
      "deptName": "研发部门",
      "orderNum": 1,
      "leader": "若依",
      "phone": null,
      "email": null,
      "status": "0",
      "delFlag": null,
      "parentName": null,
      "children": []
    },
    "roles": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "roleId": 1,
        "roleName": "超级管理员",
        "roleKey": "admin",
        "roleSort": 1,
        "dataScope": "1",
        "menuCheckStrictly": false,
        "deptCheckStrictly": false,
        "status": "0",
        "delFlag": null,
        "flag": false,
        "menuIds": null,
        "deptIds": null,
        "permissions": null,
        "admin": true
      }
    ],
    "roleIds": null,
    "postIds": null,
    "roleId": null,
    "admin": true
  }
}
const test_user = {
  userId: 2,
  username: "test",
  password: "123456",
  token: 'test-token',
  permissions: [
    "system:user:resetPwd",
    "system:post:list",
    "monitor:operlog:export",
    "monitor:druid:list",
    "system:menu:query",
    "system:dept:remove",
    "system:menu:list",
    "tool:gen:edit",
    "system:dict:edit",
    "monitor:logininfor:remove",
    "monitor:job:list",
    "system:user:query",
    "system:user:add",
    "system:notice:remove",
    "system:user:export",
    "system:role:remove",
    "monitor:job:edit",
    "tool:gen:query",
    "system:dept:query",
    "system:dict:list",
    "monitor:job:query",
    "monitor:online:forceLogout",
    "system:notice:list",
    "system:dict:query",
    "monitor:online:query",
    "system:notice:query",
    "system:notice:edit",
    "monitor:online:list",
    "tool:gen:import",
    "system:post:edit",
    "monitor:job:add",
    "monitor:logininfor:list",
    "tool:gen:list",
    "system:dict:export",
    "system:post:query",
    "system:post:remove",
    "system:config:edit",
    "system:user:remove",
    "system:config:list",
    "system:menu:add",
    "system:role:list",
    "system:user:import",
    "system:dict:remove",
    "system:user:edit",
    "system:post:export",
    "system:config:export",
    "system:role:edit",
    "monitor:online:batchLogout",
    "system:dept:list",
    "system:config:query",
    "monitor:operlog:remove",
    "monitor:operlog:list",
    "system:role:add",
    "system:menu:remove",
    "system:dict:add",
    "monitor:logininfor:query",
    "monitor:server:list",
    "tool:build:list",
    "monitor:logininfor:export",
    "tool:swagger:list",
    "system:dept:edit",
    "system:post:add",
    "monitor:job:changeStatus",
    "tool:gen:preview",
    "monitor:operlog:query",
    "system:user:list",
    "system:notice:add",
    "monitor:job:remove",
    "system:role:export",
    "monitor:cache:list",
    "system:config:add",
    "monitor:logininfor:unlock",
    "tool:gen:code",
    "monitor:job:export",
    "tool:gen:remove",
    "system:role:query",
    "system:menu:edit",
    "system:dept:add",
    "system:config:remove"
  ],
  roles: ["common"],
  user: {
    "createBy": "admin",
    "createTime": "2023-04-23 16:11:38",
    "updateBy": null,
    "updateTime": null,
    "remark": "测试员",
    "userId": 2,
    "deptId": 105,
    "userName": "ry",
    "nickName": "若依",
    "email": "ry@qq.com",
    "phonenumber": "15666666666",
    "sex": "1",
    "avatar": "https://pic.ziyuan.wang/user/guest/2024/03/803e2200d0cda549256f733a47fcba7d_fc259859dac73.jpeg",
    "password": "123456",
    "status": "0",
    "delFlag": "0",
    "loginIp": "116.228.230.214",
    "loginDate": "2024-03-04T09:48:29.000+08:00",
    "dept": {
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "deptId": 105,
      "parentId": 101,
      "ancestors": "0,100,101",
      "deptName": "测试部门",
      "orderNum": 3,
      "leader": "若依",
      "phone": null,
      "email": null,
      "status": "0",
      "delFlag": null,
      "parentName": null,
      "children": []
    },
    "roles": [
      {
        "createBy": null,
        "createTime": null,
        "updateBy": null,
        "updateTime": null,
        "remark": null,
        "roleId": 2,
        "roleName": "普通角色",
        "roleKey": "common",
        "roleSort": 2,
        "dataScope": "2",
        "menuCheckStrictly": false,
        "deptCheckStrictly": false,
        "status": "0",
        "delFlag": null,
        "flag": false,
        "menuIds": null,
        "deptIds": null,
        "permissions": [
          "system:user:resetPwd",
          "system:post:list",
          "monitor:operlog:export",
          "monitor:druid:list",
          "system:menu:query",
          "system:dept:remove",
          "system:menu:list",
          "tool:gen:edit",
          "system:dict:edit",
          "monitor:logininfor:remove",
          "monitor:job:list",
          "system:user:query",
          "system:user:add",
          "system:notice:remove",
          "system:user:export",
          "system:role:remove",
          "monitor:job:edit",
          "tool:gen:query",
          "system:dept:query",
          "system:dict:list",
          "monitor:job:query",
          "monitor:online:forceLogout",
          "system:notice:list",
          "system:dict:query",
          "monitor:online:query",
          "system:notice:query",
          "system:notice:edit",
          "monitor:online:list",
          "tool:gen:import",
          "system:post:edit",
          "monitor:job:add",
          "monitor:logininfor:list",
          "tool:gen:list",
          "system:dict:export",
          "system:post:query",
          "system:post:remove",
          "system:config:edit",
          "system:user:remove",
          "system:config:list",
          "system:menu:add",
          "system:role:list",
          "system:user:import",
          "system:dict:remove",
          "system:user:edit",
          "system:post:export",
          "system:config:export",
          "system:role:edit",
          "monitor:online:batchLogout",
          "system:dept:list",
          "system:config:query",
          "monitor:operlog:remove",
          "monitor:operlog:list",
          "system:role:add",
          "system:menu:remove",
          "system:dict:add",
          "monitor:logininfor:query",
          "monitor:server:list",
          "tool:build:list",
          "monitor:logininfor:export",
          "tool:swagger:list",
          "system:dept:edit",
          "system:post:add",
          "monitor:job:changeStatus",
          "tool:gen:preview",
          "monitor:operlog:query",
          "system:user:list",
          "system:notice:add",
          "monitor:job:remove",
          "system:role:export",
          "monitor:cache:list",
          "system:config:add",
          "monitor:logininfor:unlock",
          "tool:gen:code",
          "monitor:job:export",
          "tool:gen:remove",
          "system:role:query",
          "system:menu:edit",
          "system:dept:add",
          "system:config:remove"
        ],
        "admin": false
      }
    ],
    "roleIds": null,
    "postIds": null,
    "roleId": null,
    "admin": false
  }
}

function getUserId(request) {
  return request.headers['cookie'] && request.headers['cookie'].split('=')[1] === test_user.token ? test_user.userId : admin_user.userId;
}

export default [
  {
    url: '/login',
    method: 'post',
    response: (request) => {
      const { username, password } = request.body
      const res = {
        token: '',
      }
      if (username === admin_user.username && password === admin_user.password) {
        res.token = admin_user.token
      } else if (username === test_user.username && password === test_user.password) {
        res.token = test_user.token
      } else {
        return failResponseWrap(null, '账号或者密码错误')
      }
      return successResponseWrap(res)
    }
  },
  {
    url: '/logout',
    method: 'post',
    response: (request) => {
      return successResponseWrap(null)
    }
  },
  {
    url: '/getInfo',
    method: 'get',
    response: (request) => {
      const res = {
        userId: admin_user.userId,
        permissions: admin_user.permissions,
        roles: admin_user.roles,
        user: admin_user.user
      }
      if (getUserId(request) == 2) {
        res.userId = test_user.userId,
          res.permissions = test_user.permissions,
          res.roles = test_user.roles,
          res.user = test_user.user
      }
      return {
        code: 200,
        msg: '请求成功',
        status: 'ok',
        ...res
      }
    }
  },
  {
    url: '/getRouters',
    method: 'get',
    response: (request) => {
      let res = admin_data
      if (getUserId(request) == 2) {
        res = test_data
      }
      return successResponseWrap(res)
    }
  },
  {
    url: '/system/user/list',
    method: 'get',
    response: (request) => {
      let res = [
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:11:38",
          "updateBy": null,
          "updateTime": null,
          "remark": "管理员",
          "userId": 1,
          "deptId": 103,
          "userName": "admin",
          "nickName": "若依",
          "email": "ry@163.com",
          "phonenumber": "15888888888",
          "sex": "1",
          "avatar": "",
          "password": null,
          "status": "0",
          "delFlag": "0",
          "loginIp": "49.65.227.172",
          "loginDate": "2024-03-04T11:18:52.000+08:00",
          "dept": {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "deptId": 103,
            "parentId": null,
            "ancestors": null,
            "deptName": "研发部门",
            "orderNum": null,
            "leader": "若依",
            "phone": null,
            "email": null,
            "status": null,
            "delFlag": null,
            "parentName": null,
            "children": []
          },
          "roles": [],
          "roleIds": null,
          "postIds": null,
          "roleId": null,
          "admin": true
        },
        {
          "createBy": "admin",
          "createTime": "2023-04-23 16:11:38",
          "updateBy": null,
          "updateTime": null,
          "remark": "测试员",
          "userId": 2,
          "deptId": 105,
          "userName": "ry",
          "nickName": "若依",
          "email": "ry@qq.com",
          "phonenumber": "15666666666",
          "sex": "1",
          "avatar": "",
          "password": null,
          "status": "0",
          "delFlag": "0",
          "loginIp": "127.0.0.1",
          "loginDate": "2024-03-04T10:22:08.000+08:00",
          "dept": {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "deptId": 105,
            "parentId": null,
            "ancestors": null,
            "deptName": "测试部门",
            "orderNum": null,
            "leader": "若依",
            "phone": null,
            "email": null,
            "status": null,
            "delFlag": null,
            "parentName": null,
            "children": []
          },
          "roles": [],
          "roleIds": null,
          "postIds": null,
          "roleId": null,
          "admin": false
        }
      ]
      return {
        code: 200,
        msg: '请求成功',
        rows: res,
        total: res.length
      }
    }
  },
  {
    url: '/system/user/deptTree',
    method: 'get',
    response: (request) => {
      const res = [
        {
          "id": 100,
          "label": "若依科技",
          "children": [
            {
              "id": 101,
              "label": "深圳总公司",
              "children": [
                {
                  "id": 103,
                  "label": "研发部门"
                },
                {
                  "id": 104,
                  "label": "市场部门"
                },
                {
                  "id": 105,
                  "label": "测试部门"
                },
                {
                  "id": 106,
                  "label": "财务部门"
                },
                {
                  "id": 107,
                  "label": "运维部门"
                }
              ]
            },
            {
              "id": 102,
              "label": "长沙分公司",
              "children": [
                {
                  "id": 108,
                  "label": "市场部门"
                },
                {
                  "id": 109,
                  "label": "财务部门"
                }
              ]
            }
          ]
        }
      ]
      return successResponseWrap(res)
    }
  },
  {
    url: '/system/user/detail/:userId',
    method: 'get',
    response: (request) => {
      const userId = request.query.userId
      const res = {
        posts: [
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 1,
            "postCode": "ceo",
            "postName": "董事长",
            "postSort": 1,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 2,
            "postCode": "se",
            "postName": "项目经理",
            "postSort": 2,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 3,
            "postCode": "hr",
            "postName": "人力资源",
            "postSort": 3,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:41",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 4,
            "postCode": "user",
            "postName": "普通员工",
            "postSort": 4,
            "status": "0",
            "flag": false
          }
        ],
        roles: [
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:46",
            "updateBy": null,
            "updateTime": null,
            "remark": "普通角色",
            "roleId": 2,
            "roleName": "普通角色",
            "roleKey": "common",
            "roleSort": 2,
            "dataScope": "2",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": false
          }
        ]
      }
      if (userId == 2) {
        res.data = {
          "createBy": "admin",
          "createTime": "2023-04-23 16:11:38",
          "updateBy": null,
          "updateTime": null,
          "remark": "测试员",
          "userId": 2,
          "deptId": 105,
          "userName": "ry",
          "nickName": "若依",
          "email": "ry@qq.com",
          "phonenumber": "15666666666",
          "sex": "1",
          "avatar": "",
          "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
          "status": "0",
          "delFlag": "0",
          "loginIp": "113.69.35.160",
          "loginDate": "2024-03-04T14:17:52.000+08:00",
          "dept": {
            "createBy": null,
            "createTime": null,
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "deptId": 105,
            "parentId": 101,
            "ancestors": "0,100,101",
            "deptName": "测试部门",
            "orderNum": 3,
            "leader": "若依",
            "phone": null,
            "email": null,
            "status": "0",
            "delFlag": null,
            "parentName": null,
            "children": []
          },
          "roles": [
            {
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "roleId": 2,
              "roleName": "普通角色",
              "roleKey": "common",
              "roleSort": 2,
              "dataScope": "2",
              "menuCheckStrictly": false,
              "deptCheckStrictly": false,
              "status": "0",
              "delFlag": null,
              "flag": false,
              "menuIds": null,
              "deptIds": null,
              "permissions": null,
              "admin": false
            }
          ],
          "roleIds": null,
          "postIds": null,
          "roleId": null,
          "admin": false
        }
        res.postIds = [2]
        res.posts = [
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 1,
            "postCode": "ceo",
            "postName": "董事长",
            "postSort": 1,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 2,
            "postCode": "se",
            "postName": "项目经理",
            "postSort": 2,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:40",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 3,
            "postCode": "hr",
            "postName": "人力资源",
            "postSort": 3,
            "status": "0",
            "flag": false
          },
          {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:41",
            "updateBy": null,
            "updateTime": null,
            "remark": "",
            "postId": 4,
            "postCode": "user",
            "postName": "普通员工",
            "postSort": 4,
            "status": "0",
            "flag": false
          }
        ]
        res.roleIds = [2]
        res.roles = [
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:46",
            "updateBy": null,
            "updateTime": null,
            "remark": "普通角色",
            "roleId": 2,
            "roleName": "普通角色",
            "roleKey": "common",
            "roleSort": 2,
            "dataScope": "2",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": false
          }
        ]
      }
      return {
        code: 200,
        msg: '请求成功',
        ...res
      }
    }
  },
  {
    url: '/system/user/authRole/:userId',
    method: 'get',
    response: (request) => {
      const { userId } = request.query
      let res = {}
      if (userId == 2) {
        res = {
          user: {
            "createBy": "admin",
            "createTime": "2023-04-23 16:11:38",
            "updateBy": null,
            "updateTime": null,
            "remark": "测试员",
            "userId": 2,
            "deptId": 105,
            "userName": "ry",
            "nickName": "若依",
            "email": "ry@qq.com",
            "phonenumber": "15666666666",
            "sex": "1",
            "avatar": "",
            "password": "$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2",
            "status": "0",
            "delFlag": "0",
            "loginIp": "113.109.26.97",
            "loginDate": "2024-03-04T15:11:55.000+08:00",
            "dept": {
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "deptId": 105,
              "parentId": 101,
              "ancestors": "0,100,101",
              "deptName": "测试部门",
              "orderNum": 3,
              "leader": "若依",
              "phone": null,
              "email": null,
              "status": "0",
              "delFlag": null,
              "parentName": null,
              "children": []
            },
            "roles": [
              {
                "createBy": null,
                "createTime": null,
                "updateBy": null,
                "updateTime": null,
                "remark": null,
                "roleId": 2,
                "roleName": "普通角色",
                "roleKey": "common",
                "roleSort": 2,
                "dataScope": "2",
                "menuCheckStrictly": false,
                "deptCheckStrictly": false,
                "status": "0",
                "delFlag": null,
                "flag": false,
                "menuIds": null,
                "deptIds": null,
                "permissions": null,
                "admin": false
              }
            ],
            "roleIds": null,
            "postIds": null,
            "roleId": null,
            "admin": false
          },
          roles: [
            {
              "createBy": null,
              "createTime": "2023-04-23 16:11:46",
              "updateBy": null,
              "updateTime": null,
              "remark": "普通角色",
              "roleId": 2,
              "roleName": "普通角色",
              "roleKey": "common",
              "roleSort": 2,
              "dataScope": "2",
              "menuCheckStrictly": true,
              "deptCheckStrictly": true,
              "status": "0",
              "delFlag": "0",
              "flag": true,
              "menuIds": null,
              "deptIds": null,
              "permissions": null,
              "admin": false
            }
          ]
        }
      }
      return {
        code: 200,
        msg: '请求成功',
        status: 'ok',
        ...res
      }
    }
  },
  {
    url: '/system/role/list',
    method: 'get',
    response: (request) => {
      const res = {
        rows: [
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:46",
            "updateBy": null,
            "updateTime": null,
            "remark": "超级管理员",
            "roleId": 1,
            "roleName": "超级管理员",
            "roleKey": "admin",
            "roleSort": 1,
            "dataScope": "1",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": true
          },
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:46",
            "updateBy": null,
            "updateTime": null,
            "remark": "普通角色",
            "roleId": 2,
            "roleName": "普通角色",
            "roleKey": "common",
            "roleSort": 2,
            "dataScope": "2",
            "menuCheckStrictly": true,
            "deptCheckStrictly": true,
            "status": "0",
            "delFlag": "0",
            "flag": false,
            "menuIds": null,
            "deptIds": null,
            "permissions": null,
            "admin": false
          }
        ]
      }
      return {
        code: 200,
        msg: "请求成功",
        status: "OK",
        ...res,
        total: res.rows.length
      }
    }
  },
  {
    url: '/system/menu/roleMenuTreeselect/:roleId',
    method: 'get',
    response: (request) => {
      const res = {
        checkedKeys: [100, 101, 102, 103, 3],
        menus: [
          {
            "id": 1,
            "label": "系统管理",
            "children": [
              {
                "id": 100,
                "label": "用户管理",
              },
              {
                "id": 101,
                "label": "角色管理",
              },
              {
                "id": 102,
                "label": "菜单管理",
              },
            ]
          },
          {
            "id": 2,
            "label": "系统工具",
            "children": [
              {
                "id": 103,
                "label": "表单构建"
              },
            ]
          },
          {
            "id": 3,
            "label": "若依官网"
          }
        ]
      }
      return {
        code: 200,
        msg: '请求成功',
        ...res
      }
    }
  },
  {
    url: '/system/role/detail/:roleId',
    method: 'get',
    response: (request) => {
      const res = {
        "createBy": null,
        "createTime": "2023-04-23 16:11:46",
        "updateBy": null,
        "updateTime": null,
        "remark": "普通角色",
        "roleId": 2,
        "roleName": "普通角色",
        "roleKey": "common",
        "roleSort": 2,
        "dataScope": "2",
        "menuCheckStrictly": true,
        "deptCheckStrictly": true,
        "status": "0",
        "delFlag": "0",
        "flag": false,
        "menuIds": null,
        "deptIds": null,
        "permissions": null,
        "admin": false
      }
      return successResponseWrap(res)
    }
  },
  {
    url: '/system/menu/treeselect',
    method: 'get',
    response: (request) => {
      const res = [
        {
          "id": 1,
          "label": "系统管理",
          "children": [
            {
              "id": 100,
              "label": "用户管理",
            },
            {
              "id": 101,
              "label": "角色管理",
            },
            {
              "id": 102,
              "label": "菜单管理",
            },
          ]
        },
        {
          "id": 2,
          "label": "系统工具",
          "children": [
            {
              "id": 103,
              "label": "表单构建"
            },
          ]
        },
        {
          "id": 3,
          "label": "若依官网"
        }
      ]
      return successResponseWrap(res)
    }
  },
  {
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    response: (request) => {
      const res = {
        rows: [
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:38",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "userId": 2,
            "deptId": 105,
            "userName": "ry",
            "nickName": "若依",
            "email": "ry@qq.com",
            "phonenumber": "15666666666",
            "sex": null,
            "avatar": null,
            "password": null,
            "status": "0",
            "delFlag": null,
            "loginIp": null,
            "loginDate": null,
            "dept": {
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "deptId": 105,
              "parentId": null,
              "ancestors": null,
              "deptName": null,
              "orderNum": null,
              "leader": null,
              "phone": null,
              "email": null,
              "status": null,
              "delFlag": null,
              "parentName": null,
              "children": []
            },
            "roles": [],
            "roleIds": null,
            "postIds": null,
            "roleId": null,
            "admin": false
          }
        ]
      }
      return {
        code: 200,
        msg: '请求成功',
        ...res,
        total: res.rows.length
      }
    }
  },
  {
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    response: (request) => {
      const res = {
        rows: [
          {
            "createBy": null,
            "createTime": "2023-04-23 16:11:38",
            "updateBy": null,
            "updateTime": null,
            "remark": null,
            "userId": 1,
            "deptId": 103,
            "userName": "admin",
            "nickName": "若依",
            "email": "ry@163.com",
            "phonenumber": "15888888888",
            "sex": null,
            "avatar": null,
            "password": null,
            "status": "0",
            "delFlag": null,
            "loginIp": null,
            "loginDate": null,
            "dept": {
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "deptId": 103,
              "parentId": null,
              "ancestors": null,
              "deptName": null,
              "orderNum": null,
              "leader": null,
              "phone": null,
              "email": null,
              "status": null,
              "delFlag": null,
              "parentName": null,
              "children": []
            },
            "roles": [],
            "roleIds": null,
            "postIds": null,
            "roleId": null,
            "admin": true
          }
        ]
      }
      return {
        code: 200,
        msg: '请求成功',
        ...res,
        total: res.rows.length
      }
    }
  },
  {
    url: '/system/menu/list',
    method: 'get',
    response: (request) => {
      const res = [
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:49",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 1,
          "menuName": "系统管理",
          "parentName": null,
          "parentId": 0,
          "orderNum": 1,
          "path": "system",
          "component": null,
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "M",
          "visible": "0",
          "status": "0",
          "perms": "",
          "icon": "system",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:50",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 3,
          "menuName": "系统工具",
          "parentName": null,
          "parentId": 0,
          "orderNum": 3,
          "path": "tool",
          "component": null,
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "M",
          "visible": "0",
          "status": "0",
          "perms": "",
          "icon": "tool",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:50",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 4,
          "menuName": "若依官网",
          "parentName": null,
          "parentId": 0,
          "orderNum": 4,
          "path": "http://ruoyi.vip",
          "component": null,
          "query": "",
          "isFrame": "0",
          "isCache": "0",
          "menuType": "M",
          "visible": "0",
          "status": "0",
          "perms": "",
          "icon": "lark",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:51",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 100,
          "menuName": "用户管理",
          "parentName": null,
          "parentId": 1,
          "orderNum": 1,
          "path": "user",
          "component": "system/user/index",
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "C",
          "visible": "0",
          "status": "0",
          "perms": "system:user:list",
          "icon": "peoples",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:52",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 101,
          "menuName": "角色管理",
          "parentName": null,
          "parentId": 1,
          "orderNum": 2,
          "path": "role",
          "component": "system/role/index",
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "C",
          "visible": "0",
          "status": "0",
          "perms": "system:role:list",
          "icon": "permissions",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:52",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 102,
          "menuName": "菜单管理",
          "parentName": null,
          "parentId": 1,
          "orderNum": 3,
          "path": "menu",
          "component": "system/menu/index",
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "C",
          "visible": "0",
          "status": "0",
          "perms": "system:menu:list",
          "icon": "application-menu",
          "children": []
        },
        {
          "createBy": null,
          "createTime": "2023-04-23 16:11:59",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "menuId": 115,
          "menuName": "表单构建",
          "parentName": null,
          "parentId": 3,
          "orderNum": 1,
          "path": "build",
          "component": "tool/build/index",
          "query": "",
          "isFrame": "1",
          "isCache": "0",
          "menuType": "C",
          "visible": "0",
          "status": "0",
          "perms": "tool:build:list",
          "icon": "form-one",
          "children": []
        },
      ]
      return successResponseWrap(res)
    }
  }
]