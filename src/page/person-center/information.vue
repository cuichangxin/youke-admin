<template>
  <a-form
    ref="formRef"
    :model="form"
    class="form"
    :rules="rules"
    :label-col-props="{ span: 5 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item field="nickName" label="用户昵称">
      <a-input v-model="form.nickName" placeholder="请输入您的昵称" />
    </a-form-item>
    <a-form-item field="phonenumber" label="手机号码">
      <a-input v-model="form.phonenumber" placeholder="请输入您的手机号码" />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="form.email" placeholder="请输入您的邮箱" />
    </a-form-item>
    <a-form-item field="sex" label="性别">
      <a-radio-group v-model="form.sex">
        <a-radio value="0">男</a-radio>
        <a-radio value="1">女</a-radio>
      </a-radio-group>
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
import { updateUserProfile } from '@/api/user'
import { Message } from '@arco-design/web-vue'

const props = defineProps({
  user: {
    type: Object,
  },
})

const formRef = ref(null)
const form = ref({
  name: undefined,
  userName: undefined,
  phone: undefined,
  email: undefined,
  dept: undefined,
  sex: '0',
})

const rules = {
  nickName: [{ required: true, message: '昵称不能为空' }],
  phonenumber: [
    { required: true, message: '手机号码不能为空' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码' },
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '请输入正确的邮箱地址' },
  ],
}
const validate = async () => {
  const res = await formRef.value?.validate()
  if (!res) {
    updateUserProfile().then(res => {
      Message.success('修改成功')
      // eslint-disable-next-line vue/no-mutating-props
      props.user.phonenumber = form.value.phonenumber
      // eslint-disable-next-line vue/no-mutating-props
      props.user.email = form.value.email
    })
  }
}
const reset = async () => {
  await formRef.value?.resetFields()
}

// 回显当前登录用户信息
watch(
  () => props.user,
  user => {
    if (user) {
      form.value = { nickName: user.nickName, phonenumber: user.phonenumber, email: user.email, sex: user.sex }
    }
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
.form {
  width: 540px;
}
</style>
