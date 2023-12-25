<template>
  <div>
    <div class="role_search">
      <a-space>
        <a-form :model="queryParams" layout="inline" ref="formRef" @submit="search">
          <a-form-item field="roleName" label="角色名称">
            <a-input v-model="queryParams.roleName" />
          </a-form-item>
          <a-form-item field="roleKey" label="权限字符">
            <a-input v-model="queryParams.roleKey" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select :style="{ width: '180px' }" v-model="queryParams.status" allow-clear>
              <a-option :value="'0'">正常</a-option>
              <a-option :value="'1'">停用</a-option>
            </a-select>
          </a-form-item>
          <a-form-item label="创建时间">
            <a-range-picker show-time v-model="dateRange" :time-picker-props="{}" format="YYYY-MM-DD HH:mm" />
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
        <label class="role_content_title">角色列表</label>
        <div class="role_content_setting">
          <a-space>
            <a-button type="primary" @click="addRole" v-hasPermi="['system:role:add']">
              <template #icon>
                <icon-plus />
              </template>
              <template #default>新增</template>
            </a-button>
            <a-button
              type="primary"
              status="danger"
              :disabled="removeFlag"
              @click="handleDelete"
              v-hasPermi="['system:role:remove']"
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
        class="role_table"
        :bordered="false"
        row-key="roleId"
        :loading="loading"
        :row-selection="rowSelection"
        :data="roleList"
        @select="tableSelect"
      >
        <template #columns>
          <a-table-column
            title="角色编号"
            :width="120"
            data-index="roleId"
            align="center"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          ></a-table-column>
          <a-table-column
            title="角色名称"
            data-index="roleName"
            align="center"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"
          />
          <a-table-column title="权限字符" data-index="roleKey" align="center" />
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
                v-if="record.roleId !== '1'"
                type="text"
                size="mini"
                @click="changeRole(record)"
                v-hasPermi="['system:role:edit']"
                >修改</a-button
              >
              <a-button
                v-if="record.roleId !== '1'"
                type="text"
                size="mini"
                status="danger"
                @click="handleDelete(record)"
                v-hasPermi="['system:role:remove']"
                >删除</a-button
              >
              <a-button
                v-if="record.roleId !== '1'"
                type="text"
                size="mini"
                @click="handleAuthUser(record)"
                v-hasPermi="['system:role:edit']"
                >分配用户</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model:visible="visible"
      :title="`${dialogTitleFlag ? '新增' : '修改'}角色`"
      :on-before-ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="addForm" ref="modalFormRef">
        <a-form-item field="roleName" label="角色名称" :rules="[{ required: true, message: '角色名称是必填项' }]">
          <a-input v-model="addForm.roleName" />
        </a-form-item>
        <a-form-item
          required
          field="roleKey"
          label="权限字符"
          :rules="[{ required: true, message: '权限字符是必填项' }]"
        >
          <a-input v-model="addForm.roleKey" />
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-space>
            <a-radio-group v-model="addForm.status">
              <a-radio :value="'1'">正常</a-radio>
              <a-radio :value="'0'">停用</a-radio>
            </a-radio-group>
          </a-space>
        </a-form-item>
        <a-form-item field="menuKeys" label="菜单权限" class="menus_item_class">
          <a-space>
            <a-checkbox v-model="expandFlag" @change="handleExpand">展开/折叠</a-checkbox>
            <a-checkbox v-model="checkAllFlag" @change="handleCheckAll">全选/全不选</a-checkbox>
            <a-checkbox v-model="treeStrictly" @change="handleStrictly">父子关联</a-checkbox>
          </a-space>
          <a-tree
            class="menus_tree"
            ref="treeRef"
            :checkable="true"
            :check-strictly="!treeStrictly"
            :default-expanded-keys="treeCheckList"
            v-model="addForm.menuKeys"
            :data="treeData"
          />
        </a-form-item>
        <a-form-item field="remark" label="描述">
          <a-textarea v-model="addForm.remark" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { addDateRange } from '@/utils/utils'

const router = useRouter()
const { proxy } = getCurrentInstance()
const { $modal, $message } = getCurrentInstance().appContext.config.globalProperties

const formRef = ref(null)
const treeRef = ref(null)
const modalFormRef = ref(null)
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
})
const addForm = reactive({
  // 弹窗表单
  roleName: '',
  roleKey: '',
  status: '0',
  menuKeys: [],
  remark: '',
})
const dateRange = ref([])
const treeData = ref([])
const roleList = ref([])
const loading = ref(false)
const visible = ref(false)
const dialogTitleFlag = ref(true)
const expandFlag = ref(false)
const checkAllFlag = ref(false)
const treeStrictly = ref(true) // 树父子是否关联
const treeCheckList = ref([]) // 树选中的列表
const removeFlag = ref(true) // 头部删除按钮禁用
const tableSelectList = ref([]) // 表格选中的id数组
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})

// 搜索
const search = ({ values, errors }) => {
  queryParams.value.pageNum = 1
  getList()
}
// 重置
const reset = () => {
  dateRange.value = []
  formRef.value.resetFields()
}
// 添加角色
const addRole = () => {
  visible.value = true
  dialogTitleFlag.value = true
  proxy.$http.getRoleMenuTree().then((res) => {
    treeData.value = res.data
    treeCheckList.value = []
  })
}
// 删除
const handleDelete = (record) => {
  const roleIds = record.roleId || tableSelectList.value
  $modal.confirm({
    title: '系统提示',
    content: `是否确认删除角色编号为${roleIds}的数据项?`,
    titleAlign: 'start',
    onOk: () => {
      proxy.$http.deleteRole(roleIds).then((res) => {
        getList()
        $message.success('删除成功')
      })
    },
  })
}
// 提交
const handleOk = async () => {
  return new Promise((resolve, reject) => {
    modalFormRef.value.validate((errors, record) => {
      if (!errors) {
        proxy.$http.submitRole(addForm.value).then((res) => {
          handleCancel()
          getList()
        })
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
const handleCancel = () => {
  formRef.value.resetFields()
}
// 修改角色
const changeRole = (record) => {
  dialogTitleFlag.value = false
  visible.value = true
  proxy.$http.getRoleMenuTree(record.roleId).then((res) => {
    treeData.value = res.data.menus
    treeCheckList.value = res.data.menuIds
    addForm.value = res.data // 回显
  })
}
const handleExpand = (value) => {
  expandFlag.value = value
  if (value) {
    treeRef.value.expandAll(true)
  } else {
    treeRef.value.expandAll(false)
  }
}
const handleCheckAll = (value) => {
  checkAllFlag.value = value
  if (value) {
    treeRef.value.checkAll(true)
  } else {
    treeRef.value.checkAll(false)
  }
}
const handleStrictly = (value) => {
  treeStrictly.value = value
}

const tableSelect = (rowKeys) => {
  tableSelectList.value = rowKeys
  if (rowKeys.length > 0) {
    removeFlag.value = false
  } else {
    removeFlag.value = true
  }
}
// 角色状态修改
const handleStatusChange = (record) => {
  let text = record.status === '0' ? '启用' : '停用'
  $modal.confirm({
    title: '系统提示',
    content: '确认要"' + text + '""' + record.roleName + '"角色吗?',
    titleAlign: 'start',
    onOk: () => {
      let params = {
        roleId: record.roleId,
        status: record.status,
      }
      proxy.$http.changeRoleStatus(params).then((res) => {
        getList()
        $message.success(`${text}成功`)
      })
    },
    onCancel: () => {
      record.status = record.status === '0' ? '1' : '0'
    },
  })
}

/** 分配用户 */
const handleAuthUser = (record) => {
  router.push('/system/role-auth/user/' + record.roleId)
}

const getList = () => {
  loading.value = true
  proxy.$http
    .getRoleList(addDateRange(queryParams.value, dateRange.value))
    .then((res) => {
      roleList.value = res.rows
      loading.value = false
    })
    .catch((error) => {
      loading.value = false
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
  border-radius: 4px;
}
.role_content {
  width: 100%;
  background-color: var(--color-bg-1);
  margin-top: 15px;
  padding: 15px;
  border-radius: 4px;
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
.menus_tree {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 2px;
}
</style>
