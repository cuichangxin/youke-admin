<template>
  <a-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    class="form"
    :label-col-props="{ span: 5 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item field="oldPwd" label="旧密码">
      <a-input-password v-model="formData.oldPwd" />
    </a-form-item>
    <a-form-item field="newPwd" label="新密码">
      <a-input-password v-model="formData.newPwd" />
    </a-form-item>
    <a-form-item field="confirmPwd" label="确认密码">
      <a-input-password v-model="formData.confirmPwd" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate"> 保存 </a-button>
        <a-button type="secondary" @click="reset"> 重置 </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { updateUserPwd } from '@/api/user'
import { Message } from '@arco-design/web-vue'

const formData = ref({
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
})
const formRef = ref(null)

const rules = {
  oldPwd: [
    {
      required: true,
      message: '旧密码不能为空',
    },
  ],
  newPwd: [
    {
      required: true,
      message: '新密码不能为空',
    },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符' },
  ],
  confirmPwd: [
    {
      required: true,
      message: '确认密码不能为空',
    },
    {
      validator: (value, cb) => {
        if (value !== formData.value.newPwd) {
          cb('两次输入的密码不一致')
        } else {
          cb()
        }
      },
    },
  ],
}

const validate = async () => {
  const res = await formRef.value?.validate()
  if (!res) {
    updateUserPwd(user.oldPassword, user.newPassword).then(response => {
      Message.success('修改成功')
    })
  }
}
const reset = async () => {
  await formRef.value?.resetFields()
}
</script>

<style lang="less" scoped>
.form {
  width: 540px;
}
</style>
