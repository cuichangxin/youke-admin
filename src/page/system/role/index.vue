<template>
  <div>
    <div class="role_search">
      <a-space>
        <a-form ref="formRef" :model="queryParams" layout="inline" @submit="search">
          <a-form-item field="roleName" label="角色名称">
            <a-input v-model="queryParams.roleName" />
          </a-form-item>
          <a-form-item field="roleKey" label="权限字符">
            <a-input v-model="queryParams.roleKey" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select v-model="queryParams.status" :style="{ width: '180px' }" allow-clear>
              <a-option value="0" label="正常"></a-option>
              <a-option value="1" label="停用"></a-option>
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

    <div class="role_content">
      <div class="role_content_header">
        <a-space>
          <a-button v-hasPermi="['system:role:add']" type="primary" @click="addRole">
            <template #icon>
              <Icon :icon="'plus'" />
            </template>
            <template #default>新增</template>
          </a-button>
          <a-button
            v-hasPermi="['system:role:remove']"
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
        ref="tableRef"
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
          <a-table-column title="显示顺序" data-index="roleSort" align="center" />
          <a-table-column title="状态" data-index="status" align="center">
            <template #cell="{ record }">
              <a-switch
                v-model="record.status"
                checked-value="0"
                unchecked-value="1"
                @change="handleStatusChange(record)"
              ></a-switch>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" align="center"></a-table-column>
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-button
                v-if="record.roleId != '1'"
                v-hasPermi="['system:role:edit']"
                type="text"
                size="mini"
                @click="changeRole(record)"
                >修改</a-button
              >
              <a-button
                v-if="record.roleId != '1'"
                v-hasPermi="['system:role:remove']"
                type="text"
                size="mini"
                status="danger"
                @click="handleDelete(record)"
                >删除</a-button
              >
              <a-button
                v-if="record.roleId != '1'"
                v-hasPermi="['system:role:edit']"
                type="text"
                size="mini"
                @click="handleAuthUser(record)"
                >分配用户</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <a-modal v-model:visible="visible" :title="`${dialogTitleFlag ? '新增' : '修改'}角色`" :on-before-ok="handleOk">
      <a-form ref="modalFormRef" :model="form" :auto-label-width="true">
        <a-form-item field="roleName" label="角色名称" :rules="[{ required: true, message: '角色名称不能为空' }]">
          <a-input v-model="form.roleName" />
        </a-form-item>
        <a-form-item
          required
          field="roleKey"
          label="权限字符"
          tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
          :rules="[{ required: true, message: '权限字符不能为空' }]"
        >
          <a-input v-model="form.roleKey" />
        </a-form-item>
        <a-form-item field="roleSort" label="角色顺序" :rules="[{ required: true, message: '角色顺序不能为空' }]">
          <a-input-number v-model="form.roleSort" />
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-space>
            <a-radio-group v-model="form.status">
              <a-radio value="0">正常</a-radio>
              <a-radio value="1">停用</a-radio>
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
            ref="treeRef"
            v-model="form.menuKeys"
            class="menus_tree"
            :checkable="true"
            :field-names="{ title: 'label', key: 'id' }"
            :check-strictly="!treeStrictly"
            :default-expanded-keys="treeCheckList"
            :data="treeData"
          />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-textarea v-model="form.remark" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { addDateRange } from '@/utils/utils'
import { Message, Modal } from '@arco-design/web-vue'
import { getRequest } from '@/api/mock_request'

const router = useRouter()
const { proxy } = getCurrentInstance()

const formRef = ref(null)
const treeRef = ref(null)
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleKey: undefined,
  status: undefined,
})
const form = ref({
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
const search = () => {
  // queryParams.value.pageNum = 1
  // getList()
}
const resetSearch = () => {
  proxy.$refs['formRef'].resetFields()
  dateRange.value = []
}
// 重置
const reset = () => {
  form.value = {
    roleId: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleSort: 0,
    status: '0',
    menuIds: [],
    deptIds: [],
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    remark: undefined,
  }
  proxy.$refs['modalFormRef'].resetFields()
}
// 添加角色
const addRole = () => {
  reset()
  treeRef.value.checkAll(false)
  visible.value = true
  dialogTitleFlag.value = true
  getRequest('/system/menu/treeselect').then(res => {
    treeData.value = res.data
    treeCheckList.value = []
  })
}
// 删除
const handleDelete = record => {
  const roleIds = record.roleId || tableSelectList.value
  Modal.confirm({
    title: '系统提示',
    content: `是否确认删除角色编号为${roleIds}的数据项?`,
    titleAlign: 'start',
    onOk: () => {
      // proxy.$http.deleteRole(roleIds).then((res) => {
      //   getList()
      //   Message.success('删除成功')
      //   proxy.$refs['tableRef'].selectAll(false)
      //   removeFlag.value = true
      // })
    },
  })
}
// 提交
const handleOk = async () => {
  return new Promise((resolve, reject) => {
    proxy.$refs['modalFormRef'].validate((errors, record) => {
      if (!errors) {
        if (form.value.roleId != undefined) {
          // proxy.$http
          //   .updateRole(form.value)
          //   .then((res) => {
          //     Message.success('修改成功')
          //     getList()
          //     proxy.$refs['tableRef'].selectAll(false)
          //     removeFlag.value = true
          //     resolve(true)
          //   })
          //   .catch(() => {
          //     resolve(false)
          //   })
        } else {
          // proxy.$http
          //   .addRole(form.value)
          //   .then((res) => {
          //     Message.success('新增成功')
          //     getList()
          //     proxy.$refs['tableRef'].selectAll(false)
          //     removeFlag.value = true
          //     resolve(true)
          //   })
          //   .catch(() => {
          //     resolve(false)
          //   })
        }
      } else {
        resolve(false)
      }
    })
  })
}
/** 根据角色ID查询菜单树结构 */
function getRoleMenuTreeselect(roleId) {
  return new Promise((resolve, reject) => {
    getRequest('/system/menu/roleMenuTreeselect/' + roleId).then(response => {
      treeData.value = response.menus
      resolve(response)
    })
  })
}
// 修改角色
const changeRole = record => {
  reset()
  treeRef.value.checkAll(false)
  dialogTitleFlag.value = false
  const roleId = record.roleId || ids.value
  const roleMenu = getRoleMenuTreeselect(roleId)
  getRequest('/system/role/detail/' + roleId).then(res => {
    form.value = res.data
    form.value.roleSort = Number(form.value.roleSort)
    visible.value = true
    roleMenu.then(response => {
      let checkedKeys = response.checkedKeys
      checkedKeys.forEach(v => {
        treeRef.value.checkNode(v, true, true)
      })
    })
  })
}
const handleExpand = value => {
  expandFlag.value = value
  if (value) {
    treeRef.value.expandAll(true)
  } else {
    treeRef.value.expandAll(false)
  }
}
const handleCheckAll = value => {
  checkAllFlag.value = value
  if (value) {
    treeRef.value.checkAll(true)
  } else {
    treeRef.value.checkAll(false)
  }
}
const handleStrictly = value => {
  treeStrictly.value = value
}

const tableSelect = rowKeys => {
  tableSelectList.value = rowKeys
  if (rowKeys.length > 0) {
    removeFlag.value = false
  } else {
    removeFlag.value = true
  }
}
// 角色状态修改
const handleStatusChange = record => {
  let text = record.status === '0' ? '启用' : '停用'
  Modal.confirm({
    title: '系统提示',
    content: '确认要"' + text + '""' + record.roleName + '"角色吗?',
    titleAlign: 'start',
    onOk: () => {
      // proxy.$http.changeRoleStatus({ roleId: record.roleId, status: record.status }).then((res) => {
      //   getList()
      //   Message.success(`${text}成功`)
      // })
    },
    onCancel: () => {
      record.status = record.status === '0' ? '1' : '0'
    },
  })
}

/** 分配用户 */
const handleAuthUser = record => {
  router.push('/system/role-auth/user/' + record.roleId)
}

const getList = () => {
  loading.value = true
  getRequest('/system/role/list', addDateRange(queryParams.value, dateRange.value))
    .then(res => {
      roleList.value = res.rows
      loading.value = false
    })
    .catch(error => {
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
  background-color: var(--color-bg-1);
  padding: 20px 15px;
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

.arco-btn-size-mini {
  padding: 0 3px;
}
</style>
