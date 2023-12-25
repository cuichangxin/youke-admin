<template>
  <a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
    <a-form-item
      field="oldPwd"
      label="旧密码"
      :rules="[
        {
          required: true,
          message: '旧密码不能为空',
        },
      ]"
    >
      <a-input v-model="formData.oldPwd" />
    </a-form-item>
    <a-form-item
      field="newPwd"
      label="新密码"
      :rules="[
        {
          required: true,
          message: '新密码不能为空',
        },
      ]"
    >
      <a-input v-model="formData.newPwd" />
    </a-form-item>
    <a-form-item
      field="confirmPwd"
      label="确认密码"
      :rules="[
        {
          required: true,
          message: '确认密码不能为空',
        },
      ]"
    >
      <a-input v-model="formData.confirmPwd" />
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
const formData = ref({
  oldPwd: '',
  newPwd: '',
  confirmPwd: '',
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
