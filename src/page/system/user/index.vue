<template>
  <div>
    <div class="user_search">
      <a-space>
        <a-form ref="formRef" :model="queryParams" layout="inline" @submit="search">
          <a-form-item field="userName" label="用户名称">
            <a-input v-model="queryParams.userName" />
          </a-form-item>
          <a-form-item field="phonenumber" label="手机号码">
            <a-input v-model="queryParams.phonenumber" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select v-model="queryParams.status" :style="{ width: '180px' }" allow-clear>
              <a-option value="0" label="正常" />
              <a-option value="1" label="停用" />
            </a-select>
          </a-form-item>
          <a-form-item label="创建时间">
            <a-range-picker v-model="dateRange" style="width: 254px" :time-picker-props="{}" format="YYYY-MM-DD" />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="search">搜索</a-button>
              <a-button type="outline" @click="resetSearch">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-space>
    </div>

    <div class="user_content">
      <div class="user_content_header">
        <a-space>
          <a-button v-hasPermi="['system:user:add']" type="primary" @click="handleAdd">
            <template #icon>
              <Icon :icon="'plus'" />
            </template>
            <template #default>新增</template>
          </a-button>
          <a-button
            v-hasPermi="['system:user:edit']"
            type="primary"
            status="success"
            :disabled="single"
            @click="handleUpdate"
          >
            <template #icon>
              <Icon :icon="'editor'" />
            </template>
            <template #default>修改</template>
          </a-button>
          <a-button
            v-hasPermi="['system:user:remove']"
            type="primary"
            status="danger"
            :disabled="removeFlag"
            @click="handleDelete"
          >
            <template #icon>
              <Icon :icon="'delete'" />
            </template>
            <template #default>删除</template>
          </a-button>
        </a-space>
        <a-space>
          <a-tooltip content="刷新">
            <a-button shape="circle" @click="getList">
              <template #icon>
                <Icon :icon="'refresh'" />
              </template>
            </a-button>
          </a-tooltip>
        </a-space>
      </div>

      <a-table
        class="user_table"
        :bordered="false"
        row-key="userId"
        :loading="loading"
        :row-selection="rowSelection"
        :data="userList"
        @select="userSelect"
      >
        <template #columns>
          <a-table-column
            title="用户编号"
            :width="120"
            data-index="userId"
            align="center"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          ></a-table-column>
          <a-table-column
            title="用户名称"
            data-index="userName"
            align="center"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          />
          <a-table-column title="用户昵称" data-index="nickName" align="center" />
          <a-table-column title="部门" data-index="dept.deptName" align="center" />
          <a-table-column title="手机号码" data-index="phonenumber" align="center" />
          <a-table-column title="状态" data-index="status" align="center">
            <template #cell="{ record }">
              <a-tooltip :content="record.status === '0' ? '正常' : '停用'">
                <a-switch
                  v-model="record.status"
                  checked-value="0"
                  unchecked-value="1"
                  @change="handleStatusChange(record)"
                ></a-switch>
              </a-tooltip>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" align="center"></a-table-column>
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-button
                v-if="record.userId != '1'"
                v-hasPermi="['system:user:edit']"
                type="text"
                size="mini"
                @click="handleUpdate(record)"
                >修改</a-button
              >
              <a-button
                v-if="record.userId != '1'"
                v-hasPermi="['system:user:remove']"
                type="text"
                status="danger"
                size="mini"
                @click="handleDelete(record)"
                >删除</a-button
              >
              <a-button
                v-if="record.userId != '1'"
                v-hasPermi="['system:user:resetPwd']"
                type="text"
                size="mini"
                @click="handleResetPwd(record)"
                >重置密码</a-button
              >
              <a-button
                v-if="record.userId != '1'"
                v-hasPermi="['system:user:edit']"
                type="text"
                size="mini"
                @click="handleAuthUser(record)"
                >分配角色</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <!-- 重置密码弹窗 -->
    <a-modal v-model:visible="resetPwdVisible" title="提示">
      <div style="margin-bottom: 8px">请输入 "{{ resetPwdName.userName }}" 用户的新密码</div>
      <a-form ref="pwdFormRef" :model="pwdForm" auto-label-width :rules="rules">
        <a-form-item field="resetPassword" class="pwd-item">
          <a-input ref="resetPwdRef" v-model="pwdForm.resetPassword"></a-input>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-space>
          <a-button @click="resetPwdVisible = false">取 消</a-button>
          <a-button type="primary" @click="submitForm">确 定</a-button>
        </a-space>
      </template>
    </a-modal>

    <!-- 新增/修改用户弹窗 -->
    <a-modal v-model:visible="open" :title="title" :width="700">
      <a-form ref="userRef" :model="form" :rules="userRules">
        <a-row>
          <a-col :span="12">
            <a-form-item label="用户昵称" field="nickName" label-col-flex="100px">
              <a-input v-model="form.nickName" placeholder="请输入用户昵称" :max-length="30" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="归属部门" field="deptId" label-col-flex="100px">
              <a-tree-select
                v-model="form.deptId"
                :data="deptOptions"
                :field-names="{ title: 'label', key: 'id' }"
                placeholder="请选择归属部门"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机号码" field="phonenumber" label-col-flex="100px">
              <a-input v-model="form.phonenumber" placeholder="请输入手机号码" :max-length="11" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱" field="email" label-col-flex="100px">
              <a-input v-model="form.email" placeholder="请输入邮箱" :max-length="50" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-if="form.userId == undefined" label="用户名称" field="userName" label-col-flex="100px">
              <a-input v-model="form.userName" placeholder="请输入用户名称" :max-length="30" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item v-if="form.userId == undefined" label="用户密码" field="password" label-col-flex="100px">
              <a-input-password v-model="form.password" placeholder="请输入用户密码" :max-length="20" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="用户性别" field="sex" label-col-flex="100px">
              <a-select v-model="form.sex">
                <a-option label="男" value="0"></a-option>
                <a-option label="女" value="1"></a-option>
                <a-option label="未知" value="2"></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" field="status" label-col-flex="100px">
              <a-radio-group v-model="form.status">
                <a-radio value="0" label="正常">正常</a-radio>
                <a-radio value="1" label="停用">停用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="岗位" field="postIds" label-col-flex="100px">
              <a-select v-model="form.postIds">
                <a-option
                  v-for="item in postOptions"
                  :key="item.postName"
                  :value="item.postId"
                  :label="item.postName"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色" field="status" label-col-flex="100px">
              <a-select v-model="form.roleIds">
                <a-option
                  v-for="item in roleOptions"
                  :key="item.roleName"
                  :value="item.roleId"
                  :label="item.roleName"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="备注" field="remark" label-col-flex="100px">
              <a-textarea v-model="form.remark" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <a-space>
          <a-button @click="open = false">取 消</a-button>
          <a-button type="primary" @click="submitFormUpdate">确 定</a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { addDateRange } from '@/utils/utils'
import { Message, Modal } from '@arco-design/web-vue'
import { getRequest } from '@/api/mock_request'

const router = useRouter()
const { proxy } = getCurrentInstance()
const form = ref({})
const queryParams = ref({
  userName: '',
  phonenumber: '',
  status: '',
  createTime: '',
})
const pwdForm = ref({
  resetPassword: '',
})
const resetPwdName = ref('')
const resetPwdVisible = ref(false)
const dateRange = ref([])
const loading = ref(false)
const removeFlag = ref(true)
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const userList = ref([])
const userSelectList = ref([])
const roleOptions = ref([])
const open = ref(false)
const title = ref('')
const initPassword = ref(undefined)
const single = ref(true)
const deptOptions = ref(undefined)
const postOptions = ref(undefined)

const rules = {
  resetPassword: [
    { required: true, message: '密码不能为空' },
    { minLength: 5, message: '用户密码长度必须介于5-20之间' },
    { maxLength: 20, message: '用户密码长度必须介于5-20之间' },
  ],
}
const userRules = {
  userName: [
    { required: true, message: '用户名称不能为空' },
    { minLength: 2, message: '用户名称长度必须介于2-20之间' },
    { maxLength: 20, message: '用户名称长度必须介于2-20之间' },
  ],
  nickName: [{ required: true, message: '用户昵称不能为空' }],
  password: [
    { required: true, message: '用户密码不能为空' },
    { minLength: 5, message: '用户名称长度必须介于5-20之间' },
    { maxLength: 20, message: '用户名称长度必须介于5-20之间' },
  ],
  phonenumber: [{ match: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请输入正确的手机号码' }],
}

/** 查询部门下拉树结构 */
function getDeptTree() {
  getRequest('/system/user/deptTree').then(response => {
    deptOptions.value = response.data
  })
}

/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: '0',
    remark: undefined,
    postIds: [],
    roleIds: [],
  }
  proxy.$refs['userRef'].resetFields()
}

const search = () => {
  // getList()
}
const resetSearch = () => {
  proxy.$refs['formRef'].resetFields()
  dateRange.value = []
}
const userSelect = rowKeys => {
  userSelectList.value = rowKeys
  single.value = rowKeys.length != 1
  if (rowKeys.length > 0) {
    removeFlag.value = false
  } else {
    removeFlag.value = true
  }
}
/** 新增按钮操作 */
const handleAdd = () => {
  reset()
  getRequest(`/system/user/detail`).then(response => {
    postOptions.value = response.posts
    roleOptions.value = response.roles
    open.value = true
    title.value = '添加用户'
    form.value.password = initPassword.value
  })
}
/** 修改按钮操作 */
const handleUpdate = row => {
  reset()
  const userId = row.userId || userSelectList.value
  getRequest(`/system/user/detail/${userId}`).then(response => {
    form.value = response.data
    postOptions.value = response.posts
    roleOptions.value = response.roles
    form.value.roleIds = response.roleIds
    open.value = true
    title.value = '修改用户'
    form.password = ''
  })
}
/** 删除按钮操作 */
const handleDelete = row => {
  const userIds = row.userId || userSelectList.value
  Modal.confirm({
    title: '提示',
    content: '是否确认删除用户编号为"' + userIds + '"的数据项?',
    titleAlign: 'start',
    onOk: () => {
      // getRequest(`/system/user`,userIds).then((res) => {
      //   getList()
      //   Message.success(`删除成功`)
      // })
    },
  })
}
/** 重置密码按钮操作 */
const handleResetPwd = row => {
  resetPwdName.value = row
  resetPwdVisible.value = true
  pwdForm.value.resetPassword = ''
  setTimeout(() => {
    proxy.$refs['resetPwdRef'].focus()
  })
}
// 重置密码提交
const submitForm = () => {
  proxy.$refs['pwdFormRef']
    .validate()
    .then(res => {
      if (!res) {
        // putRequest('/system/user/resetPwd',{ userId: resetPwdName.value.userId, password: pwdForm.value.resetPassword })
        // .then((res) => {
        //   Message.success('修改成功,新密码是:' + pwdForm.value.resetPassword)
        //   resetPwdVisible.value = false
        // })
      }
    })
    .catch(() => {})
}

// 新增/修改用户信息
const submitFormUpdate = () => {
  proxy.$refs['userRef']
    .validate()
    .then(res => {
      if (!res) {
        if (form.value.userId !== undefined) {
          // proxy.$http.updateUser(form.value).then((res) => {
          //   Message.success('修改成功')
          //   open.value = false
          //   getList()
          // })
        } else {
          // proxy.$http.addUser(form.value).then((res) => {
          //   Message.success('新增成功')
          //   open.value = false
          //   getList()
          // })
        }
      }
    })
    .catch(() => {})
}
/** 用户状态更改 */
const handleStatusChange = row => {
  let text = row.status === '0' ? '启用' : '停用'
  Modal.confirm({
    title: '提示',
    content: `确认要${text}${row.userName}用户吗?`,
    titleAlign: 'start',
    onOk: () => {
      // proxy.$http
      //   .changeUserStatus({ userId: row.userId, status: row.status })
      //   .then((res) => {
      //     getList()
      //     Message.success(`${text}成功`)
      //   })
      //   .catch(() => {
      //     row.status = row.status === '0' ? '1' : '0'
      //   })
    },
    onCancel: () => {
      row.status = row.status === '0' ? '1' : '0'
    },
  })
}

/** 跳转角色分配 */
const handleAuthUser = row => {
  const userId = row.userId
  router.push('/system/user-auth/role/' + userId)
}
// 获取用户列表
const getList = () => {
  loading.value = true
  getRequest('/system/user/list', addDateRange(queryParams.value, dateRange.value))
    .then(res => {
      loading.value = false
      userList.value = res.rows
    })
    .catch(err => {
      loading.value = false
    })
}
onMounted(() => {
  getList()
  getDeptTree()
})
</script>

<style lang="less" scoped>
.user_search {
  width: 100%;
  background-color: var(--color-bg-1);
  padding: 20px 15px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.user_content {
  width: 100%;
  background-color: var(--color-bg-1);
  margin-top: 15px;
  padding: 15px;
  border-radius: 4px;
}

.user_content_header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu_content_title {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-1);
  }
}

.user_table {
  margin-top: 16px;
}

.user_item_class {
  :deep(.arco-form-item-wrapper-col) {
    .arco-form-item-content-wrapper {
      .arco-form-item-content-flex {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}

.pwd-item {
  :deep(.arco-form-item-label-col) {
    display: none;
  }
}
</style>
