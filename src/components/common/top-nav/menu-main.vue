<template>
  <a-menu mode="horizontal" :selected-keys="[selectKeys]" @menu-item-click="clickMenu">
    <!-- <topMenuItem v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path" /> -->
    <template v-for="(route, index) in routeList">
      <template v-if="!route.hidden">
        <template v-if="hasOneShowingChild(route.children, route) && !route.alwaysShow">
          <a-menu-item :key="showRouteInfo(route).path">
            <template #icon>
              <Icons :icon="showRouteInfo(route).meta.icon" size="19" />
            </template>
            <span>{{showRouteInfo(route).meta.title}}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="route.path">
            <template #icon>
              <Icons :icon="route.meta.icon" size="19" />
            </template>
            <template #title>
              <span>{{ route.meta.title }}</span>
            </template>
            <menu-sub v-for="child in route.children" :key="child.path" :menu-item="child" />
          </a-sub-menu>
        </template>
      </template>
    </template>
  </a-menu>
</template>
<script setup>
import menuSub from './menu-sub.vue'
import Icons from '@/components/common/icon'
import { listenerRouteChange } from '@/utils/route-listener'
import { useTabStore, usePermissionStore, useAppStore } from '@/store'
import { isHttp } from '@/utils/utils'
import { useMenuLayout } from '@/hooks/menuLayout'

const { selectKeys, layoutMode } = useMenuLayout()
const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routeList = computed(() => permissionStore.topbarRouters)
const routes = computed(() => permissionStore.routes)

listenerRouteChange((e) => {
  findMenuItem(routeList.value, e.path)
})

const onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.path === '/index') {
      onlyOneChild.value = item
    }
    if (item.hidden) {
      return false
    } else {
      return true
    }
  })
  // 当只有一个子路由器时，默认显示该子路由器
  if (showingChildren.length === 1) {
    return true
  }
  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

const clickMenu = (key) => {
  selectKeys.value = key
  if (appStore.layoutMode == 1) {
    let nowMenu

    if (key === '/index') {
      nowMenu = routes.value.find((item) => item.path === '/').children[0]
    } else {
      nowMenu = routes.value.find((item) => item.path === key)
    }
    if (isHttp(key)) {
      window.open(key, '_blank')
    } else if (!nowMenu || !nowMenu.children) {
      router.push({ path: key })
      appStore.updateSettings({
        menu: false,
      })
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

const showRouteInfo = (item) => {
  if (item.path === '/') {
    return item.children[0]
  } else if (!item.alwaysShow && item.children && item.children.length === 1) {
    return item.children[0]
  } else {
    return item
  }
}

watch(
  () => router.currentRoute.value,
  (n) => {
    // selectKeys.value = n.path
  },
  { immediate: true }
)
onMounted(() => {
  const routeTag = permissionStore.topbarRouters.some((v) => v.path === route.matched[0].path)
  if (layoutMode.value === '1') {
    if (routeTag) {
      selectKeys.value = route.matched[0].path
    } else {
      selectKeys.value = route.fullPath
    }
  }
})
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
