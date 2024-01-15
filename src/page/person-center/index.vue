<template>
  <div>
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <a-card :bordered="false">
          <a-space :size="54">
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
                    <icon-camera />
                  </template>
                  <img v-if="fileList.length" :src="fileList[0].url" />
                </a-avatar>
              </template>
            </a-upload>
            <a-descriptions
              :data="renderData"
              :column="2"
              align="right"
              layout="inline-horizontal"
              :label-style="{
                width: '140px',
                fontWeight: 'normal',
                color: 'rgb(var(--gray-8))',
              }"
              :value-style="{
                width: '200px',
                paddingLeft: '8px',
                textAlign: 'left',
              }"
            >
              <template #label="{ label }">{{ label }} :</template>
            </a-descriptions>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="wrapper">
      <a-col :span="24">
        <a-tabs default-active-key="1" type="rounded">
          <a-tab-pane key="1" title="基础信息">
            <BasicInformation />
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

const { proxy } = getCurrentInstance()
const userStore = useUserStore()

const file = {
  uid: '-2',
  name: 'avatar.png',
  url: userStore.avatar,
}
const renderData = [
  {
    label: '姓名',
    value: userStore.name,
  },
  {
    label: '用户名',
    value: userStore.userName,
  },
  {
    label: '账号ID',
    value: userStore.accountId,
  },
  {
    label: '手机号',
    value: userStore.phone,
  },
  {
    label: '邮箱',
    value: userStore.email,
  },
  {
    label: '角色',
    value: userStore.roleGroup,
  },
  {
    label: '注册时间',
    value: userStore.registrationDate,
  },
  {
    label: '单位',
    value: userStore.dept,
  },
]
const fileList = ref([file])
const uploadChange = (fileItemList, fileItem) => {
  fileList.value = [fileItem]
}
const customRequest = (options) => {
  // docs: https://axios-http.com/docs/cancellation
  const controller = new AbortController()

  ;(async function requestWrap() {
    const { onProgress, onError, onSuccess, fileItem, name = 'file' } = options
    onProgress(20)
    const formData = new FormData()
    formData.append(name, fileItem.file)
    const onUploadProgress = (event) => {
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
</script>
<style lang="less" scoped>
.user-detail {
  width: 100%;
  background-color: var(--color-bg-2);
}
.arco-card {
  padding: 10px;
  border-radius: 4px;
}
:deep(.arco-avatar-trigger-icon-button) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #e8f3ff;
  .arco-icon-camera {
    margin-top: 8px;
    color: rgb(var(--arcoblue-6));
    font-size: 14px;
  }
}
.wrapper {
  padding: 20px 0 0 20px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
</style>
