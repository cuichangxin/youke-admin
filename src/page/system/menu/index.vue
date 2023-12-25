<template>
  <div>
    <div class="menu_search">
      <a-space>
        <a-form :model="queryParams" layout="inline" ref="formRef" @submit="search">
          <a-form-item field="menuName" label="菜单名称">
            <a-input v-model="queryParams.menuName" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-select :style="{ width: '180px' }" v-model="queryParams.status" allow-clear>
              <a-option :value="'0'">正常</a-option>
              <a-option :value="'1'">停用</a-option>
            </a-select>
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
    <div class="menu_content">
      <div class="menu_content_header">
        <div class="menu_content_setting">
          <a-space>
            <a-button type="primary" @click="handleAdd">
              <template #icon>
                <icon-plus />
              </template>
              <template #default>新增</template>
            </a-button>
            <a-button @click="toggleExpandAll">
              <template #icon>
                <icon-swap :rotate="90" />
              </template>
              <template #default>展开/折叠</template>
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
        v-if="refreshTable"
        class="menu_table"
        :bordered="false"
        row-key="menuId"
        :default-expand-all-rows="isExpandAll"
        :loading="loading"
        :data="menuList"
      >
        <template #columns>
          <a-table-column title="菜单名称" data-index="menuName" align="center"></a-table-column>
          <a-table-column title="图标" data-index="icon" align="center"></a-table-column>
          <a-table-column title="排序" data-index="orderNum" align="center"></a-table-column>
          <a-table-column title="权限标识" data-index="perms" align="center"></a-table-column>
          <a-table-column title="组件路径" data-index="component" align="center"></a-table-column>
          <a-table-column title="状态" align="center" data-index="status">
            <template #cell="{ record }">
              <a-tag v-model="record.status" :color="record.status === '0' ? '#168cff' : '#f53f3f'">{{
                record.status === '0' ? '正常' : '停用'
              }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" align="center"></a-table-column>
          <a-table-column title="操作" :width="240" align="center">
            <template #cell="{ record }">
              <a-button type="text" size="mini" @click="handleUpdate(record)" v-hasPermi="['system:menu:edit']">修改</a-button>
              <a-button type="text" size="mini" @click="handleAdd(record)" v-hasPermi="['system:menu:add']">新增</a-button>
              <a-button type="text" size="mini" status="danger" @click="handleDelete(record)" v-hasPermi="['system:menu:remove']">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <!-- 新增/修改dialog -->
      <a-modal v-model:visible="open" :title="title" :width="700">
        <a-form :model="form" :rules="rules" ref="menuRef">
          <a-row>
            <a-col :span="24">
              <a-form-item label="上级菜单" label-col-flex="100px">
                <a-tree-select
                  v-model="form.parentId"
                  :data="menuOptions"
                  :fieldNames="{ key: 'menuId', title: 'menuName', children: 'children', icon: 'icons' }"
                  placeholder="选择上级菜单"
                  allow-clear
                  check-strictly
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="菜单类型" field="menuType" label-col-flex="100px">
                <a-radio-group v-model="form.menuType">
                  <a-radio value="M">目录</a-radio>
                  <a-radio value="C">菜单</a-radio>
                  <a-radio value="F">按钮</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="24" v-if="form.menuType != 'F'">
              <a-form-item label="菜单图标" field="icon" label-col-flex="100px">
                <a-popover trigger="click" position="bottom" style="width: 380px">
                  <a-input v-model="form.icon" :readonly="true" placeholder="请选择图标">
                    <template #prefix>
                      <Icon v-if="form.icon" :icon="form.icon" size="18"></Icon>
                      <icon-search v-else />
                    </template>
                  </a-input>
                  <template #content>
                    <iconSelect @selected="selected" :activeIcon="form.icon" />
                  </template>
                </a-popover>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="菜单名称" field="menuName" label-col-flex="100px">
                <a-input v-model="form.menuName" placeholder="请输入菜单名称" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="显示排序" field="orderNum" label-col-flex="100px">
                <a-input-number v-model="form.orderNum" />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType != 'F'">
              <a-form-item
                label="是否外链"
                field="isFrame"
                tooltip="选择是外链则路由地址需要以`http(s)://`开头"
                label-col-flex="100px"
              >
                <a-radio-group v-model="form.isFrame">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType != 'F'">
              <a-form-item
                label="路由地址"
                field="path"
                tooltip="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
                label-col-flex="100px"
              >
                <a-input v-model="form.path" placeholder="请输入路由地址" />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType == 'C'">
              <a-form-item
                label="组件路径"
                field="component"
                tooltip="访问的组件路径，如：`system/user/index`"
                label-col-flex="100px"
              >
                <a-input v-model="form.component" placeholder="请输入组件路径" />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType != 'M'">
              <a-form-item
                label="权限字符"
                field="perms"
                tooltip="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                label-col-flex="100px"
              >
                <a-input v-model="form.perms" placeholder="请输入权限标识" />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType == 'C'">
              <a-form-item
                label="路由参数"
                field="query"
                tooltip='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
                label-col-flex="100px"
              >
                <a-input v-model="form.query" placeholder="请输入路由参数" />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType == 'C'">
              <a-form-item
                label="是否缓存"
                field="isCache"
                tooltip="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
                label-col-flex="100px"
              >
                <a-radio-group v-model="form.isCache">
                  <a-radio value="0">缓存</a-radio>
                  <a-radio value="1">不缓存</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="form.menuType != 'F'">
              <a-form-item
                label="显示状态"
                field="visible"
                tooltip="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                label-col-flex="100px"
              >
                <a-radio-group v-model="form.visible">
                  <a-radio value="0">显示</a-radio>
                  <a-radio value="1">隐藏</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="菜单状态"
                field="status"
                tooltip="选择停用则路由将不会出现在侧边栏，也不能被访问"
                label-col-flex="100px"
              >
                <a-radio-group v-model="form.status">
                  <a-radio value="0">正常</a-radio>
                  <a-radio value="1">停用</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <template #footer>
          <div class="dialog-footer">
            <a-space>
              <a-button @click="open = false">取 消</a-button>
              <a-button type="primary" @click="submitForm">确 定</a-button>
            </a-space>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script setup>
import { handleTree } from '@/utils/utils'
import iconSelect from '@/components/common/iconSelect/index.vue'
import Icon from '@/components/common/icon'

const router = useRouter()
const { proxy } = getCurrentInstance()
const { $modal, $message } = getCurrentInstance().appContext.config.globalProperties
const formRef = ref(null)

const form = ref({
  menuId: undefined,
  parentId: 0,
  menuName: undefined,
  icon: undefined,
  menuType: 'M',
  orderNum: undefined,
  isFrame: '1',
  isCache: '0',
  visible: '0',
  status: '0',
})
const queryParams = ref({
  menuName: undefined,
  status: '',
})
const loading = ref(false)
const title = ref('')
const open = ref(false)
const refreshTable = ref(true)
const isExpandAll = ref(false)
const menuOptions = ref([])
const menuList = ref([])
const rules = {
  menuName: [{ required: true, message: '菜单名称不能为空' }],
  orderNum: [{ required: true, message: '菜单顺序不能为空' }],
  path: [{ required: true, message: '路由地址不能为空' }],
}

/** 查询菜单下拉树结构 */
function getTreeselect() {
  menuOptions.value = []
  proxy.$http.listMenu().then((response) => {
    const menu = { menuId: 0, menuName: '主类目', children: [] }
    menu.children = handleTree(response.data, 'menuId')
    menuOptions.value.push(menu)
  })
}
// 搜索
const search = () => {
  getList()
}

// 重置
const reset = () => {
  form.value = {
    menuId: undefined,
    parentId: 0,
    menuName: undefined,
    icon: undefined,
    menuType: 'M',
    orderNum: undefined,
    isFrame: '1',
    isCache: '0',
    visible: '0',
    status: '0',
  }
  queryParams.value = {
    menuName: undefined,
    status: '',
  }
  formRef.value.resetFields()
}
// 新增
const handleAdd = (record) => {
  reset()
  getTreeselect()
  if (record != null && record.menuId) {
    form.value.parentId = record.menuId
  } else {
    form.value.parentId = 0
  }
  open.value = true
  title.value = '添加菜单'
}
// 展开/折叠
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}
// 修改
const handleUpdate = async (record) => {
  await getTreeselect()
  proxy.$http.getMenu({ menuId: record.menuId }).then((res) => {
    form.value = res.data
    open.value = true
    title.value = '修改菜单'
  })
}
// 删除
const handleDelete = (record) => {
  $modal.confirm({
    title: '系统提示',
    content: `是否确认删除名称为${record.menuName}的数据项?`,
    titleAlign: 'start',
    onOk: () => {
      proxy.$http.delMenu({ menuId: record.menuId }).then((res) => {
        getList()
        $message.success('删除成功')
      })
    },
  })
}

// 选择图标
const selected = (name) => {
  form.value.icon = name
}

// 提交
const submitForm = () => {
  proxy.$refs['menuRef']
    .validate()
    .then((res) => {
      if (!res) {
        if (form.value.menuId != undefined) {
          proxy.$http.updateMenu(form.value).then((res) => {
            $message.success('修改成功')
            open.value = false
            getList()
          })
        } else {
          proxy.$http.addMenu(form.value).then((res) => {
            $message.success('新增成功')
            open.value = false
            getList()
          })
        }
      }
    })
    .catch(() => {})
}

const getList = () => {
  loading.value = true
  proxy.$http.listMenu(queryParams.value).then((response) => {
    menuList.value = handleTree(response.data, 'menuId')
    loading.value = false
  }).catch((err) => {
    loading.value = false
  })
}
onMounted(() => {
  getList()
})
</script>
<style lang="less" scoped>
.menu_search {
  width: 100%;
  height: 100px;
  background-color: var(--color-bg-1);
  padding: 0 15px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}
.menu_content {
  width: 100%;
  background-color: var(--color-bg-1);
  margin-top: 15px;
  padding: 15px;
  border-radius: 4px;
}
.menu_content_header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .menu_content_title {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-1);
  }
}
.menu_table {
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
