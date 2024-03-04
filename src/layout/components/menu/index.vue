<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
    show-collapse-button
    v-model:open-keys="openKeys"
    :selected-keys="[selectKeys]"
    @collapse="onCollapse"
    @menu-item-click="onMenuItemClick"
  >
    <menu-item v-for="(route, index) in routeList" :key="route.path" :item="route.path === '/' ? route.children[0] : route" />
  </a-menu>
</template>
<script setup>
import MenuItem from './menu-item.vue'
import { useAppStore, useTabStore, usePermissionStore } from '@/store'
import { listenerRouteChange } from '@/utils/route-listener'
import { isHttp } from '@/utils/utils'
import useMenuLayout from '@/hooks/menuLayout'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routerTag = useTabStore()
const router = useRouter()
const route = useRoute()

const routeList = computed(() => permissionStore.sidebarRouters)
const openKeys = ref([])
const { selectKeys } = useMenuLayout()

listenerRouteChange((e) => {
  let pathSplit = e.path.split('/'),
    path = pathSplit[pathSplit.length - 1]
  findMenuItem(routeList.value, path)
  selectKeys.value = pathSplit.includes('index') ? `/${path}` : path
})

const onCollapse = (collapsed) => {
  appStore.updateSettings({ menuCollapse: collapsed })
}

function findMenuItem(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      routerTag.updateTabList(item)
    } else if (item?.children) {
      findMenuItem(item.children, path)
    }
  })
}
const onMenuItemClick = (key) => {
  let name = key === '/index' ? 'Index' : key.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  if (isHttp(key)) {
    window.open(key)
  } else {
    router.push({ name: name })
  }
}

watch(
  () => router.currentRoute.value,
  (n) => {
    let pathSplit = n.path.split('/')
    pathSplit.forEach((item, index) => {
      if (index < pathSplit.length - 1 && item !== '') {
        if (index === 1) {
          item = '/' + item
        }
        openKeys.value.push(item)
      }
    })
  },
  { immediate: true }
)
onMounted(async () => {
  let pathSplit = route.path.split('/'),
    path = pathSplit[pathSplit.length - 1]
  await routerTag.initTabBar(routeList.value, path)
})
</script>
<style lang="less" scoped></style>
