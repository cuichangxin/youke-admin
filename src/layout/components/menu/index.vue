<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
    show-collapse-button
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    @collapse="onCollapse"
  >
    <Menu v-for="route in router.options.routes" :key="route.path" :item="route" :base-path="route.path" />
  </a-menu>
</template>
<script setup>
import Menu from './SideBarItem.vue'
import { useAppStore, useTabStore } from '@/store'

const appStore = useAppStore()
const routerTag = useTabStore()
const router = useRouter()
const route = useRoute()

const openKeys = ref([])
const selectedKeys = ref([])

const onCollapse = (collapsed) => {
  appStore.updateSettings({menuCollapse:collapsed})
}
const handleMenu = (path) => {
  findMenuItem(router.options.routes, path)
}
provide('handleMenu', handleMenu)

function findMenuItem(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      routerTag.updateTabList(item)
    } else if (item?.children) {
      findMenuItem(item.children, path)
    }
  })
}

function findRouteChange(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      if (!selectedKeys.value.includes(item.path)) {
        selectedKeys.value.push(item.path)
      }
      if (item.path.split('/').length - 1 >= 2) {
        let list = findOpenKey(router.options.routes, item, openKeys.value)
        openKeys.value = openKeys.value.concat(list)
      }
    } else if (item?.children) {
      findRouteChange(item.children, path)
    }
  })
}

function findOpenKey(data, target, result) {
  for (let i in data) {
    if (data[i].path === target.path) {
      return [data[i].path]
    }

    if (data[i].children) {
      let isFind = findOpenKey(data[i].children, target, result)
      if (isFind !== undefined) {
        return isFind.concat(data[i].path)
      }
    }
  }
}

watch(
  () => router.currentRoute.value,
  (n) => {
    selectedKeys.value = []
    findRouteChange(router.options.routes, n.path)
  },
  { immediate: true }
)
onMounted(async () => {
  await routerTag.initTabBar(router.options.routes, route.path)
})
</script>
<style lang="less" scoped></style>
