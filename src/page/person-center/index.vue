<template>
  <div class="user-center">
    <div class="my-card">
      <a-upload
        :custom-request="customRequest"
        list-type="picture-card"
        :file-list="fileList"
        :show-upload-button="true"
        :show-file-list="false"
        @change="uploadChange"
      >
        <template #upload-button>
          <a-avatar :size="90" class="info-avatar">
            <template #trigger-icon>
              <Icon :icon="'camera'" />
            </template>
            <img v-if="fileList.length" :src="fileList[0].url" />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions class="descriptions" :column="1" :label-style="{ color: 'rgb(var(--gray-8))' }">
        <a-descriptions-item label="用户昵称">
          {{ renderData.user.nickName }}
        </a-descriptions-item>
        <a-descriptions-item label="用户名称">
          {{ renderData.user.userName }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号码">
          {{ renderData.user.phonenumber }}
        </a-descriptions-item>
        <a-descriptions-item label="用户邮箱">
          {{ renderData.user.email }}
        </a-descriptions-item>
        <a-descriptions-item v-if="renderData.user.dept" label="所属部门">
          {{ renderData.user.dept.deptName }} / {{ renderData.postGroup }}
        </a-descriptions-item>
        <a-descriptions-item label="所属角色">
          {{ renderData.roleGroup }}
        </a-descriptions-item>
        <a-descriptions-item label="注册时间">
          {{ renderData.user.createTime }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <a-row class="wrapper">
      <a-col>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="基础信息">
            <BasicInformation :user="renderData.user" />
          </a-tab-pane>
          <a-tab-pane key="2" title="修改密码">
            <Password />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store'
import BasicInformation from './information.vue'
import Password from './password.vue'
import { getUserProfile } from '@/api/mock'
import { reactive, ref } from 'vue'

const { proxy } = getCurrentInstance()
const userStore = useUserStore()

const file = {
  uid: '-2',
  name: 'avatar.png',
  url: userStore.avatar,
}
const renderData = reactive({
  user: {},
  roleGroup: undefined,
  postGroup: {},
})
const fileList = ref([file])
const uploadChange = (fileItemList, fileItem) => {
  fileList.value = [fileItem]
}
const customRequest = options => {
  // docs: https://axios-http.com/docs/cancellation
  const controller = new AbortController()

  ;(async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name, fileItem.file)
    const onUploadProgress = event => {
      let percent
      if (event.total > 0) {
        percent = (event.loaded / event.total) * 100
      }
      onProgress(parseInt(String(percent), 10), event)
    }

    try {
      // https://github.com/axios/axios/issues/1630
      // https://github.com/nuysoft/Mock/issues/127

      const res = await proxy.$http.userUploadApi(formData, {
        controller,
        onUploadProgress,
      })
      onSuccess(res)
    } catch (error) {
      onError(error)
    }
  })()
  return {
    abort() {
      controller.abort()
    },
  }
}

function getUser() {
  getUserProfile().then(response => {
    renderData.user = response.data
    renderData.roleGroup = response.roleGroup
    renderData.postGroup = response.postGroup
  })
}
getUser()
</script>

<style lang="less" scoped>
.user-center {
  display: flex;
}

.user-detail {
  width: 100%;
  background-color: var(--color-bg-2);
}

.my-card {
  background-color: var(--color-bg-2);
  padding: 10px;
  border-radius: 4px;
  min-width: 300px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

:deep(.arco-avatar-trigger-icon-button) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #e8f3ff;

  .i-icon {
    margin-top: 8px;
    color: rgb(var(--arcoblue-6));
    font-size: 14px;
  }
}

.wrapper {
  padding: 20px 0 0 20px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
  width: 65%;
}

.descriptions {
  margin-top: 30px;
  padding-left: 30px;
}

.arco-upload {
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0;
}
</style>
