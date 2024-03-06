<template>
  <div>
    <div class="role_search">
      <a-space>
        <a-form ref="formRef" :model="form" layout="inline" @submit="search">
          <a-form-item field="roleId" label="用户名称">
            <a-input v-model="form.roleId" />
          </a-form-item>
          <a-form-item field="roleName" label="手机号码">
            <a-input v-model="form.roleName" />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="search">搜索</a-button>
              <a-button type="outline" @click="reset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-space>
    </div>
    <div class="role_content">
      <div class="role_content_header">
        <a-space>
          <a-button type="primary" @click="openSelectUser">
            <template #icon>
              <Icon :icon="'plus'" />
            </template>
            <template #default>添加用户</template>
          </a-button>
          <a-button type="primary" status="danger" :disabled="removeFlag" @click="cancelAuthUserAll">
            <template #icon>
              <Icon :icon="'delete'" />
            </template>
            <template #default>批量取消授权</template>
          </a-button>
          <a-button type="primary" status="warning" @click="goBack">
            <template #icon>
              <Icon :icon="'close'" />
            </template>
            <template #default>关闭</template>
          </a-button>
        </a-space>
        <RightTool @refresh-table="getList()"></RightTool>
      </div>
      <a-table
        class="role_table"
        :bordered="false"
        row-key="userId"
        :loading="loading"
        :pagination="queryParams"
        :row-selection="rowSelection"
        :data="userList"
        @select="tableSelect"
      >
        <template #columns>
          <a-table-column title="用户名称" data-index="userName" align="center"></a-table-column>
          <a-table-column title="用户昵称" data-index="nickName" align="center" />
          <a-table-column title="手机" data-index="phoneNumber" align="center" />
          <a-table-column title="状态" data-index="status" align="center">
            <template #cell="{ record }">
              <a-tag v-model="record.status" :color="record.status === '0' ? '#168cff' : '#f53f3f'">{{
                record.status === '0' ? '正常' : '停用'
              }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" align="center"></a-table-column>
          <a-table-column title="操作" :width="240" align="center">
            <template #cell="{ record }">
              <a-button type="text" size="mini" @click="cancelAuthUser(record)">取消授权</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    <select-user ref="selectRef" :role-id="route.params.roleId" @ok="getList" />
  </div>
</template>

<script setup>
import selectUser from './selectUser.vue'
import RightTool from '@/components/common/rightTableTool/index.vue'
import { getRequest } from '@/api/mock_request'

const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()
const { $modal, $message } = getCurrentInstance().appContext.config.globalProperties
const formRef = ref(null)
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
const form = reactive({
  userName: '',
  phoneNumber: '',
})
const removeFlag = ref(true)
const loading = ref(false)
const userList = ref([])
const cloneDeepTableData = ref([])
const userIds = ref([])

const queryParams = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 10,
  roleId: route.params.roleId,
  userName: undefined,
  phonenumber: undefined,
  showTotal: true,
  showJumper: true,
  showPageSize: true,
})

/** 查询授权用户列表 */
const getList = () => {
  loading.value = true
  getRequest('/system/role/authUser/allocatedList', queryParams).then(res => {
    queryParams.total = res.total
    userList.value = res.rows
    loading.value = false
  })
}

const search = () => {
  // getList()
}
const reset = () => {
  formRef.value.resetFields()
}
const goBack = () => {
  router.go(-1)
}
// 取消授权操作
const cancelAuthUser = record => {
  $modal.confirm({
    title: '系统提示',
    content: `确认要取消该用户"${record.userName}"角色吗?`,
    titleAlign: 'start',
    onOk: () => {
      // proxy.$http.authUserCancel({ roleId: route.params.roleId, userId: record.userId }).then((res) => {
      //   getList()
      //   $message.success('取消授权成功')
      // })
    },
  })
}
const tableSelect = rowKeys => {
  userIds.value = rowKeys
  if (rowKeys.length > 0) {
    removeFlag.value = false
  } else {
    removeFlag.value = true
  }
}

const openSelectUser = () => {
  proxy.$refs['selectRef'].show()
}
// 批量取消授权
const cancelAuthUserAll = () => {
  const roleId = route.params.roleId
  const uIds = userIds.value.join(',')
  $modal.confirm({
    title: '系统提示',
    content: `是否取消选中用户授权数据项?`,
    titleAlign: 'start',
    onOk: () => {
      // proxy.$http.authUserCancelAll({ roleId: roleId, userIds: uIds }).then((res) => {
      //   getList()
      //   $message.success('取消授权成功')
      //   removeFlag.value = true
      // })
    },
  })
}
onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.role_search {
  width: 100%;
  height: 100px;
  background-color: var(--color-bg-1);
  padding: 0 15px;
  display: flex;
  align-items: center;
}
.role_content {
  width: 100%;
  background-color: var(--color-bg-1);
  margin-top: 15px;
  padding: 15px;
}
.role_content_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .role_content_title {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-1);
  }
}
.role_table {
  margin-top: 16px;
}
.menus_item_class {
  :deep(.arco-form-item-wrapper-col) {
    .arco-form-item-content-wrapper {
      .arco-form-item-content-flex {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
