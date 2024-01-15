<template>
  <a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 5 }" :wrapper-col-props="{ span: 16 }">
    <a-form-item
      field="name"
      label="姓名"
      :rules="[
        {
          required: true,
          message: '姓名不能为空',
        },
      ]"
    >
      <a-input v-model="formData.name" placeholder="请输入您的姓名" />
    </a-form-item>
    <a-form-item
      field="userName"
      label="用户名"
      :rules="[
        {
          required: true,
          message: '用户名不能为空',
        },
      ]"
    >
      <a-input v-model="formData.userName" placeholder="请输入您的用户名" />
    </a-form-item>
    <a-form-item
      field="phone"
      label="手机号"
      :rules="[
        {
          required: true,
          message: '手机号不能为空',
        },
      ]"
    >
      <a-input v-model="formData.phone" placeholder="请输入您的手机号" />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="formData.email" placeholder="请输入您的邮箱" />
    </a-form-item>
    <a-form-item
      field="dept"
      label="单位"
      :rules="[
        {
          required: true,
          message: '单位不能为空',
        },
      ]"
    >
      <a-input v-model="formData.dept" placeholder="请输入您的单位" />
    </a-form-item>
    <a-form-item field="sex" label="性别">
      <a-radio-group v-model="formData.sex">
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
const formRef = ref(null)
const formData = ref({
  name:undefined,
  userName: undefined,
  phone: undefined,
  email:undefined,
  dept:undefined,
  sex: '0',
})

const validate = async () => {
  const res = await formRef.value?.validate()
  if (!res) {
    //  写代码
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
