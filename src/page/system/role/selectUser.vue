<template>
  <!-- 授权用户 -->
  <a-modal v-model:visible="visible" title="选择用户" width="800px">
    <a-form ref="queryRef" :model="queryParams" layout="inline">
      <a-form-item label="用户名称" field="userName">
        <a-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </a-form-item>
      <a-form-item label="手机号码" field="phoneNumber">
        <a-input
          v-model="queryParams.phoneNumber"
          placeholder="请输入手机号码"
          allow-clear
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleQuery">搜索</a-button>
          <a-button type="outline" @click="resetQuery">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table
      ref="refTable"
      row-key="userId"
      :data="userList"
      :bordered="false"
      :row-selection="rowSelection"
      :scroll="{ x: 0, y: '120%', minWidth: 0, maxHeight: '260px' }"
      @select="handleSelectionChange"
    >
      <template #columns>
        <a-table-column title="用户名称" data-index="userName" />
        <a-table-column title="用户昵称" data-index="nickName" />
        <a-table-column title="手机" data-index="phoneNumber" ellipsis tooltip />
        <a-table-column title="状态" align="center" data-index="status">
          <template #cell="{ record }">
            <a-tag v-model="record.status" :color="record.status === '0' ? '#168cff' : '#f53f3f'">{{
              record.status === '0' ? '正常' : '停用'
            }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" align="center" data-index="createTime"> </a-table-column>
      </template>
    </a-table>
    <template #footer>
      <div class="dialog-footer">
        <a-space>
          <a-button @click="visible = false">取 消</a-button>
          <a-button type="primary" @click="handleSelectUser">确 定</a-button>
        </a-space>
      </div>
    </template>
  </a-modal>
</template>

<script setup name="SelectUser">
import { Message } from '@arco-design/web-vue'
import { getRequest } from '@/api/mock_request'
import { reactive, ref, getCurrentInstance } from 'vue'

const props = defineProps({
  roleId: {
    type: [Number, String],
  },
})

const { proxy } = getCurrentInstance()
const queryRef = ref(null)
const userList = ref([])
const visible = ref(false)
const total = ref(0)
const userIds = ref([])
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleId: undefined,
  userName: undefined,
  phoneNumber: undefined,
})
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})

// 显示弹框
function show() {
  queryParams.roleId = props.roleId
  getList()
  visible.value = true
}
// 多选框选中数据
function handleSelectionChange(selection) {
  userIds.value = selection
}
// 查询表数据
function getList() {
  getRequest('/system/role/authUser/unallocatedList', queryParams).then(res => {
    userList.value = res.rows
    total.value = res.total
  })
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value.resetFields()
  handleQuery()
}
const emit = defineEmits(['ok'])
/** 选择授权用户操作 */
function handleSelectUser() {
  const roleId = queryParams.roleId
  const uIds = userIds.value.join(',')
  if (uIds == '') {
    Message.error('请选择要分配的用户')
    return
  }
  // proxy.$http.authUserSelectAll({ roleId: roleId, userIds: uIds }).then((res) => {
  //   Message.success(res.msg)
  //   if (res.code === 200) {
  visible.value = false
  emit('ok')
  //   }
  // })
}

defineExpose({
  show,
})
</script>
