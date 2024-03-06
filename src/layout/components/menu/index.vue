<template>
  <a-menu
    v-model:open-keys="openKeys"
    :style="{ width: '100%', height: '100%' }"
    show-collapse-button
    :selected-keys="[selectKeys]"
    :theme="menuColors"
    @collapse="onCollapse"
    @menu-item-click="onMenuItemClick"
  >
    <menu-item v-for="route in routeList" :key="route.path" :item="route.path === '/' ? route.children[0] : route" />
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
const menuColors = computed(() => appStore.menuColors)

listenerRouteChange(e => {
  const pathSplit = e.path.split('/')
  const path = pathSplit[pathSplit.length - 1]
  findMenuItem(routeList.value, path)
  selectKeys.value = pathSplit.includes('index') ? `/${path}` : path
})

const onCollapse = collapsed => {
  appStore.updateSettings({ menuCollapse: collapsed })
}

function findMenuItem(data, path) {
  data.forEach(item => {
    if (item.path === path) {
      routerTag.updateTabList(item)
    } else if (item?.children) {
      findMenuItem(item.children, path)
    }
  })
}
const onMenuItemClick = key => {
  const name = key === '/index' ? 'Index' : key.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
  if (isHttp(key)) {
    window.open(key)
  } else {
    router.push({ name })
  }
}

watch(
  () => router.currentRoute.value,
  n => {
    const pathSplit = n.path.split('/')
    pathSplit.forEach((item, index) => {
      if (index < pathSplit.length - 1 && item !== '') {
        if (index === 1) {
          item = '/' + item
        }
        openKeys.value.push(item)
      }
    })
  },
  { immediate: true },
)
onMounted(async () => {
  const pathSplit = route.path.split('/')
  const path = pathSplit[pathSplit.length - 1]
  await routerTag.initTabBar(routeList.value, path)
})
</script>

<style lang="less" scoped></style>
import { computed } from 'vue'
