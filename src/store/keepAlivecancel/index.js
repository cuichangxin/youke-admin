import { defineStore } from 'pinia'

const useKeepAlive = defineStore('keepAlive', {
  state: () => {
    return {
      caches: [],
    }
  },
  actions: {
    addKeepAlive(name) {
      if (!this.caches.includes(name)) {
        this.caches.push(name)
      }
    },
    removeKeepAlive(name) {
      this.caches = this.caches.filter(item => {
        item !== name
      })
    },
    clearKeepAlive() {
      this.caches = []
    },
  },
})

export default useKeepAlive
