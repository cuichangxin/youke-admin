<template>
  <a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
    <a-form-item
      field="nickName"
      label="昵称"
      :rules="[
        {
          required: true,
          message: '昵称不能为空',
        },
      ]"
    >
      <a-input v-model="formData.nickName" placeholder="请输入您的昵称" />
    </a-form-item>
    <a-form-item
      field="phonenumber"
      label="手机号码"
      :rules="[
        {
          required: true,
          message: '手机号不能为空',
        },
      ]"
    >
      <a-input v-model="formData.phonenumber" placeholder="请输入您的手机号" />
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
  nickName: '',
  phonenumber: '',
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
  margin: 0 auto;
}
</style>
