<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="flex">
        <div class="left-box box">
          <div class="app-logo">
            <img src="/favicon.ico" alt="" />
            <div class="logo-title">{{ title }}</div>
          </div>
          <div class="my-auto">
            <img src="../assets/svg/login-box-bg.svg" alt="" />
          </div>
        </div>
        <div class="app-logo">
          <img src="/favicon.ico" alt="" />
          <div class="logo-title">{{ title }}</div>
        </div>
        <div class="login-wrapper box">
          <div class="login-title">登录</div>
          <div class="login-form-error-msg">{{ errorMessage }}</div>
          <a-form ref="loginForm" class="login-form" size="large" :model="userInfo" layout="vertical" @submit="handleSubmit">
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
              <a-form-item>
                <a-button type="primary" html-type="submit" long :loading="loading"> 登录 </a-button>
              </a-form-item>
            </a-space>
          </a-form>
        </div>
      </div>
    </div>
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
const title = ref('')

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
      console.error(error)
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
onMounted(() => {
  title.value = document.title
})
</script>
<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--color-bg-2);
  min-height: 100%;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('../assets/svg/backgrond.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
  }
}
body[arco-theme='dark'] .login-bg{
  &::before{
    background-image: url('../assets/svg/backgrond-dark.svg');
  }
}
.login-container {
  height: 100%;
  position: relative;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1536px;
}
@media screen and (min-width: 1536px) {
  .login-container {
    max-width: 1536px;
  }
}
@media screen and (max-width: 1096px) {
  .login-bg {
    background-color: var(--color-menu-dark-bg);
  }
  .left-box {
    display: none !important;
  }
  .login-bg::before {
    background-image: none !important;
  }
  .flex {
    justify-content: center;
    align-items: center;
    .login-wrapper {
      height: 350px;
      width: 400px;
      background-color: var(--color-bg-1);
      border-radius: 0.375rem;
      justify-content: flex-start;
      .login-form {
        width: 90%;
      }
    }
    .app-logo{
      left: 16px;
      top: 0;
      img{
        width: 35px;
      }
      .logo-title{
        font-size: 16px;
      }
    }
  }
}
.flex {
  display: flex;
  height: 100%;
}
.box {
  display: flex;
  width: 50%;
  flex-direction: column;
}
.app-logo {
  display: flex;
  width: 60%;
  height: 80px;
  position: absolute;
  top: 12px;
  align-items: center;
  padding-left: 7px;
  transition: all 0.2s ease;
  cursor: pointer;
  img {
    width: 48px;
  }
  .logo-title {
    font-size: 24px;
    color: #fff;
    font-weight: 700;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 1rem;
    margin-top: -8px;
  }
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
  img {
    width: 400px;
  }
}
.login-wrapper {
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 2rem 0 4rem;
  width: 50%;

  .logo {
    width: 50px;
    height: 50px;
  }
  .login-title {
    font-size: 24px;
    color: var(--color-text-1);
    font-weight: 700;
    line-height: 32px;
    margin: 10px 0;
  }
}
.login-form {
  width: 70%;
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
</style>
