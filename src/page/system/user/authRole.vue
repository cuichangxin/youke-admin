<template>
  <div>
    <div class="user_auth">
      <h4>基本信息</h4>
      <a-space class="space_user">
        <a-form :model="form" layout="inline" ref="formRef">
          <a-row>
            <a-col :span="12">
              <a-form-item field="nickName" label="用户昵称">
                <a-input v-model="form.nickName" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="userName" label="登录账号">
                <a-input v-model="form.userName" disabled />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-space>
    </div>
    <div class="auth_table">
      <h4>角色信息</h4>
      <a-table
        :bordered="false"
        :columns="columns"
        row-key="roleId"
        :loading="loading"
        :data="roleList"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        ref="roleRef"
      />
      <div class="button-group">
        <a-space :size="20">
          <a-button type="primary" @click="submitForm">提交</a-button>
          <a-button @click="close">返回</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTabStore } from '@/store'
import { Message } from '@arco-design/web-vue';
import { getRequest } from '@/api/mock_request';

const tabStore = useTabStore()
const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()

const form = ref({
  nickName: undefined,
  userName: undefined,
  userId: undefined,
})
const loading = ref(false)
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const columns = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '权限字符',
    dataIndex: 'roleKey',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
]
const roleList = ref([])
const selectedKeys = ref([])

// 提交按钮
const submitForm = () => {
  const userId = form.value.userId
  const rIds = selectedKeys.value.join(',')
  // proxy.$http.updateAuthRole({ userId: userId, roleIds: rIds }).then((response) => {
    Message.success('授权成功')
  //   close()
  // })
}
// 返回按钮
function close() {
  tabStore.removeRouterTagFormPath('/system/user-auth')
  router.push('/system/user')
};

onMounted(() => {
  const userId = route.params && route.params.userId
  if (userId) {
    loading.value = true
    getRequest('/system/user/authRole/' + userId).then((res) => {
      form.value = res.user
      roleList.value = res.roles
      nextTick(() => {
        roleList.value.forEach((row) => {
          if (row.flag) {
            proxy.$refs['roleRef'].select(row.roleKey, true)
          }
        })
      })
      loading.value = false
    })
  }
})
</script>
<style lang="less" scoped>
.user_auth {
  width: 100%;
  height: 100px;
  background-color: var(--color-bg-1);
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  .space_user {
    display: flex;
    justify-content: center;
    :deep(.arco-space-item) {
      width: 100%;
      display: flex;
      justify-content: center;
      .arco-form-layout-inline {
        flex-direction: column;
      }
    }
  }
}
.auth_table {
  background-color: var(--color-bg-1);
  padding: 0 15px 15px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}
.button-group {
  display: flex;
  justify-content: center;
}
h4 {
  color: var(--color-text-1);
}
</style>
