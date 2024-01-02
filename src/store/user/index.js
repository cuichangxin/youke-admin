import { defineStore } from 'pinia';
import api from '@/api/api'
import { setToken, clearToken } from '@/utils/auth'

const useUserStore = defineStore('user', {
  state: () => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    dept: '',
    role: [], // TODO: 里面内容临时的
    permissions: [],
  }),

  getters: {
    userInfo(state) {
      return { ...state };
    },
  },

  actions: {
    setInfo(partial) {
      this.$patch(partial);
    },
    resetInfo() {
      this.$reset();
    },
    // TODO: 暂时注释掉
    async info() {
      // return new Promise((resolve, reject) => {
      //   const res = api.getUserInfo()
      //   this.setInfo(res.data)
      //   resolve(res)
      // })
    },
    // 不一定是这样，可能需要按照项目情况改
    async login(loginForm) {
      try {
        const res = await api.userLogin(loginForm)
        setToken(res.data.token);
      } catch (error) {
        clearToken()
        throw error
      }
    },
    async logout() {
      return new Promise((resolve, reject) => {
        api.userLogout().then(() => {
          this.logoutCallBack()
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    logoutCallBack() {
      this.resetInfo();
      clearToken();
    },
  },
});

export default useUserStore

