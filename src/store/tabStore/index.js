import { defineStore } from 'pinia'

const formatTag = route => {
  const { name, meta, fullPath, query, path } = route
  if (route.path !== '/') {
    return {
      title: meta.title || '',
      name: String(name),
      fullPath,
      query,
      path,
    }
  }
}

const useTabStore = defineStore('tab', {
  state: () => {
    return {
      multipage: [],
    }
  },
  getters: {
    getTabList() {
      return this.multipage
    },
  },
  actions: {
    updateTabList(value) {
      if (formatTag(value) !== undefined && !this.multipage.find(item => item.path === formatTag(value).path)) {
        this.multipage.push(formatTag(value))
      }
    },
    removeRouterTag(idx, tag) {
      this.multipage.splice(idx, 1)
    },
    removeRouterTagFormPath(path) {
      this.multipage = this.multipage.filter(item => item.path === path)
    },
    clearRouterTag() {
      this.multipage = this.multipage.filter(item => item.path === '/index')
    },
    freshRouterTag(tags) {
      this.multipage = tags
    },
    initTabBar(list, path) {
      list.forEach(item => {
        if (!item.hidden) {
          if (item.path == '/index') {
            this.updateTabList(item)
          }
          if (item.path === path) {
            this.updateTabList(item)
          } else if (item?.children) {
            this.initTabBar(item.children, path)
          }
        }
      })
      const item = this.multipage.find(item => item.path === '/index')
      if (item) {
        const index = this.multipage.findIndex(item => item.path === '/index')
        this.multipage.splice(index, 1)
        this.multipage.unshift(item)
      }
    },
  },
})

export default useTabStore
