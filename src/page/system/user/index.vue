<template>
  <div>
    <div class="user_search">
      <a-space>
        <a-form :model="queryParams" layout="inline" ref="formRef" @submit="search">
          <a-form-item field="userName" label="用户名称">
            <a-input v-model="queryParams.userName" />
          </a-form-item>
          <a-form-item field="phonenumber" label="手机号码">
            <a-input v-model="queryParams.phonenumber" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select :style="{ width: '180px' }" v-model="queryParams.status" allow-clear>
              <a-option :value="'0'">正常</a-option>
              <a-option :value="'1'">停用</a-option>
            </a-select>
          </a-form-item>
          <a-form-item label="创建时间">
            <a-range-picker v-model="dateRange" show-time :time-picker-props="{}" format="YYYY-MM-DD HH:mm:ss" />
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
        <div class="user_content_setting">
          <a-space>
            <a-button type="primary" @click="handleAdd" v-hasPermi="['system:user:add']">
              <template #icon>
                <icon-plus />
              </template>
              <template #default>新增</template>
            </a-button>
            <a-button type="primary" status="success" @click="handleUpdate" v-hasPermi="['system:user:edit']">
              <template #icon>
                <icon-edit />
              </template>
              <template #default>修改</template>
            </a-button>
            <a-button
              type="primary"
              status="danger"
              :disabled="removeFlag"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
            >
              <template #icon>
                <icon-delete />
              </template>
              <template #default>删除</template>
            </a-button>
            <a-tooltip content="刷新">
              <a-button shape="circle" @click="getList">
                <template #icon>
                  <icon-refresh size="17" />
                </template>
              </a-button>
            </a-tooltip>
          </a-space>
        </div>
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
          <a-table-column title="单位" data-index="dept" align="center" />
          <a-table-column title="手机号码" data-index="phonenumber" align="center" />
          <a-table-column title="状态" data-index="status" align="center">
            <template #cell="{ record }">
              <a-tooltip :content="record.status === '0' ? '正常' : '停用'">
                <a-switch
                  v-model="record.status"
                  size="small"
                  checked-value="0"
                  unchecked-value="1"
                  @change="handleStatusChange(record)"
                />
              </a-tooltip>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" align="center"></a-table-column>
          <a-table-column title="操作" :width="240" align="center">
            <template #cell="{ record }">
              <a-button
                v-if="record.userId !== '1'"
                type="text"
                size="mini"
                v-hasPermi="['system:user:edit']"
                @click="handleUpdate(record)"
                >修改</a-button
              >
              <a-button
                v-if="record.userId !== '1'"
                type="text"
                status="danger"
                size="mini"
                @click="handleDelete(record)"
                v-hasPermi="['system:user:remove']"
                >删除</a-button
              >
              <a-button
                v-if="record.userId !== '1'"
                type="text"
                size="mini"
                v-hasPermi="['system:user:resetPwd']"
                @click="handleResetPwd(record)"
                >重置密码</a-button
              >
              <a-button
                v-if="record.userId !== '1'"
                type="text"
                size="mini"
                v-hasPermi="['system:user:edit']"
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
      <div style="margin-bottom: 8px">请输入 "{{ resetPwdName }}" 用户的新密码</div>
      <a-form :model="pwdForm" auto-label-width ref="pwdFormRef" :rules="rules">
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
      <a-form :model="form" :rules="userRules" ref="userRef">
        <a-row>
          <a-col :span="12">
            <a-form-item label="用户昵称" field="nickName" label-col-flex="100px">
              <a-input v-model="form.nickName" placeholder="请输入用户昵称" :max-length="30" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机号码" field="phonenumber" label-col-flex="100px">
              <a-input v-model="form.phonenumber" placeholder="请输入手机号码" :max-length="11" />
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
                <a-option value="0">男</a-option>
                <a-option value="1">女</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" field="status" label-col-flex="100px">
              <a-radio-group v-model="form.status">
                <a-radio value="0">正常</a-radio>
                <a-radio value="1">停用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色" field="status" label-col-flex="100px">
              <a-select v-model="form.status">
                <a-option v-for="item in roleOptions" :key="item.roleId" :value="item.roleId">{{
                  item.roleName
                }}</a-option>
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
          <a-button type="primary" @click="submitForm">确 定</a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
import { addDateRange } from '@/utils/utils'

const router = useRouter()
const { proxy } = getCurrentInstance()
const { $modal, $message } = getCurrentInstance().appContext.config.globalProperties
const form = ref({})
const queryParams = ref({
  userName: '',
  phonenumber: '',
  status: '',
  createTime: '',
})
const pwdForm = reactive({
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
const ids = ref([])

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

const search = () => {}
const resetSearch = () => {}
const userSelect = (rowKeys) => {
  userSelectList.value = rowKeys
  if (rowKeys.length > 0) {
    removeFlag.value = false
  } else {
    removeFlag.value = true
  }
}
/** 新增按钮操作 */
const handleAdd = () => {
  reset()
  proxy.$http.getUser().then((response) => {
    roleOptions.value = response.roles
    open.value = true
    title.value = '添加用户'
    form.value.password = initPassword.value
  })
}
/** 修改按钮操作 */
const handleUpdate = (row) => {
  reset()
  const userId = row.userId || ids.value
  proxy.$http.getUser(userId).then((response) => {
    form.value = response.data
    roleOptions.value = response.roles
    form.value.roleIds = response.roleIds
    open.value = true
    title.value = '修改用户'
    form.password = ''
  })
}
/** 删除按钮操作 */
const handleDelete = (row) => {
  const userIds = row.userId || ids.value
  $modal.confirm({
    title: '系统提示',
    content: '是否确认删除用户编号为"' + userIds + '"的数据项?',
    titleAlign: 'start',
    onOk: () => {
      proxy.$http.delUser({ userIds: userIds }).then((res) => {
        getList()
        $message.success(`删除成功`)
      })
    },
  })
}
/** 重置密码按钮操作 */
const handleResetPwd = (row) => {
  resetPwdName.value = row.userName
  resetPwdVisible.value = true
  pwdForm.resetPassword = ''
  setTimeout(() => {
    proxy.$refs['resetPwdRef'].focus()
  })
}
const submitForm = () => {
  proxy.$refs['pwdFormRef']
    .validate()
    .then((res) => {
      if (!res) {
        proxy.$http.resetUserPwd({ userId: row.userId, password: pwdForm.resetPassword }).then((res) => {
          $message.success('修改成功,新密码是:' + pwdForm.resetPassword)
          resetPwdVisible.value = false
        })
      }
    })
    .catch(() => {})
}

/** 跳转角色分配 */
const handleAuthUser = (row) => {
  const userId = row.userId
  router.push('/system/user-auth/role/' + userId)
}
// 获取用户列表
const getList = () => {
  loading.value = true
  proxy.$http.listUser(addDateRange(queryParams.value, dateRange.value)).then((res) => {
    loading.value = false
    userList.value = res.rows
  }).catch((err) => {
    loading.value = false
  })
}
onMounted(() => {
  getList()
})
</script>
<style lang="less" scoped>
.user_search {
  width: 100%;
  height: 100px;
  background-color: var(--color-bg-1);
  padding: 0 15px;
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
  justify-content: flex-end;
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
