<template>
  <a-menu mode="horizontal" :selected-keys="selectedKey" @menu-item-click="clickMenu">
    <topMenuItem v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path" />
  </a-menu>
</template>
<script setup>
import topMenuItem from './topMenuItem.vue'
import { listenerRouteChange } from '@/utils/route-listener'
import { useTabStore, usePermissionStore, useAppStore } from '@/store'
import { isHttp } from '@/utils/utils'

const router = useRouter()
const tabStore = useTabStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routeList = computed(() => permissionStore.topbarRouters)
const selectedKey = ref([])
const routes = computed(() => permissionStore.routes)

listenerRouteChange((e) => {
  findMenuItem(routeList.value, e.path)
})

const clickMenu = (key) => {
  if (appStore.layoutMode == 1) {
    const keys = []
    let nowMenu

    keys.push(key)
    selectedKey.value = keys

    if (key === '/index') {
      nowMenu = routes.value.find((item) => item.path === '/').children[0]
    } else {
      nowMenu = routes.value.find((item) => item.path === key)
    }
    if (isHttp(key)) {
      window.open(key, '_blank')
    } else if (!nowMenu || !nowMenu.children) {
      appStore.updateSettings({
        menu: false,
      })
      router.push({ path: key })
    } else {
      updateSideBarMenu(key)
      appStore.updateSettings({
        menu: true,
      })
    }

  } else {
    if (isHttp(key)) {
      window.open(key, '_blank')
    } else {
      router.push({ path: key })
    }
  }
}

function findMenuItem(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      tabStore.updateTabList(item)
    } else if (item?.children) {
      findMenuItem(item.children, path)
    }
  })
}

function findRouteChange(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      if (!selectedKey.value.includes(item.path)) {
        selectedKey.value.push(item.path)
      }
    } else if (item?.children) {
      findRouteChange(item.children, path)
    }
  })
}

function updateSideBarMenu(key) {
  const routeList = routes.value
    .map((item) => {
      if (item.path === key) return item.children
    })
    .filter(Boolean)[0]

  if (routeList.length > 0) {
    permissionStore.setSidebarRouters(routeList)
  } else {
    appStore.updateSettings({
      menu: false,
    })
  }
}

watch(
  () => router.currentRoute.value,
  (n) => {
    selectedKey.value = []
    findRouteChange(routeList.value, n.path)
  },
  { immediate: true }
)
</script>
<style lang="less" scoped>
.arco-menu-horizontal {
  :deep(.arco-menu-item) {
    display: inline-flex;
    .i-icon {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
  }
  :deep(.arco-menu-pop) {
    display: inline-flex;
    align-items: center;
    .i-icon {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
  }
}
:deep(.arco-menu-icon) {
  display: flex;
  align-items: center;
  margin-right: 12px;
}
</style>
