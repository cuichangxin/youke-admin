<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-wrapper">
        <img class="logo" src="/favicon.ico" alt="logo" />
        <div class="login-title">登录</div>
        <div class="login-form-error-msg">{{ errorMessage }}</div>
        <a-form ref="loginForm" class="login-form" :model="userInfo" layout="vertical" @submit="handleSubmit">
          <a-form-item
            field="username"
            :rules="[{ required: true, message: '用户名不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input v-model="userInfo.username" :placeholder="'请输入用户名'">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password v-model="userInfo.password" :placeholder="'请输入密码'" allow-clear>
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <a-checkbox
                checked="rememberPassword"
                :model-value="userInfo.rememberPassword"
                @change="setRememberPassword"
              >
                记住密码
              </a-checkbox>
              <a-link>忘记密码</a-link>
            </div>
            <a-button type="primary" html-type="submit" long :loading="loading"> 登录 </a-button>
          </a-space>
        </a-form>
      </div>
    </div>
    <img class="login-banner" src="../assets/images/login-banner.png" />
  </div>
</template>
<script setup>
import { useUserStore } from '@/store'
import { Message } from '@arco-design/web-vue'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

const router = useRouter()
const userStore = useUserStore()
const userInfo = ref({
  username: '',
  password: '',
  rememberPassword: false,
})
const loading = ref(false)
const errorMessage = ref('')

const handleSubmit = async ({ values, errors }) => {
  if (loading.value) return
  if (!errors) {
    loading.value = true
    try {
      await userStore.login(values)
      const { redirect, ...othersQuery } = router.currentRoute.value.query
      router.push({
        name: redirect || 'Index',
        query: {
          ...othersQuery,
        },
      })
      Message.success('登录成功')
      const { rememberPassword } = userInfo
      const { username, password } = values
      if (rememberPassword) {
        Cookies.set('username', username, { expires: 30 })
        Cookies.set('password', encrypt(password), { expires: 30 })
        Cookies.set('rememberMe', rememberPassword, { expires: 30 })
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
    } catch (error) {
      errorMessage.value = error.message
      console.error(error);
    } finally {
      loading.value = false
    }
  }
}
const setRememberPassword = (value) => {
  userInfo.value.rememberPassword = value
}
function getCookie() {
  const username = Cookies.get('username')
  const passwords = Cookies.get('password')
  const rememberMes = Cookies.get('rememberMe')
  userInfo.value.username = username === undefined ? userInfo.value.username : username
  userInfo.value.password = passwords === undefined ? userInfo.value.password : decrypt(passwords)
  userInfo.value.rememberPassword = rememberMes === undefined ? userInfo.value.rememberPassword : Boolean(rememberMes)
}
getCookie()
</script>
<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--color-bg-1);
}
.login-container {
  display: flex;
  justify-content: center;
  flex: 1;
}
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  margin: 0 20px;
  width: 400px;

  .logo {
    width: 50px;
    height: 50px;
  }
  .login-title {
    font-size: 24px;
    color: var(--color-text-1);
    font-weight: 500;
    line-height: 32px;
    margin: 10px 0;
  }
}
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
.login-banner {
  width: 750px;
  height: 100%;
}
label {
  font-weight: normal;
}
</style>
