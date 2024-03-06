import { defineStore } from 'pinia'
import { postRequest, getRequest } from '@/api/mock_request'
import { getToken, setToken, clearToken } from '@/utils/auth'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    role: [],
    permissions: [],
  }),

  getters: {
    userInfo(state) {
      return { ...state }
    },
  },

  actions: {
    setInfo(partial) {
      this.$patch(partial)
    },
    resetInfo() {
      this.$reset()
    },
    async info() {
      return new Promise((resolve, reject) => {
        getRequest('/getInfo')
          .then(res => {
            const { user } = res
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.role = res.roles
              this.permissions = res.permissions
            } else {
              this.role = ['ROLE_DEFAULT']
            }
            this.avatar = user.avatar
            this.name = user.name
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async login(loginForm) {
      try {
        const res = await postRequest('/login', loginForm)
        setToken(res.data.token)
      } catch (error) {
        clearToken()
        throw error
      }
    },
    async logout() {
      return new Promise((resolve, reject) => {
        postRequest('/logout')
          .then(() => {
            this.logoutCallBack()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logoutCallBack() {
      this.resetInfo()
      clearToken()
    },
  },
})

export default useUserStore
