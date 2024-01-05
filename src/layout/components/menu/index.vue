<template>
  <a-menu
    :style="{ width: '100%', height: '100%' }"
    show-collapse-button
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    @collapse="onCollapse"
  >
    <!-- <Menu v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path" /> -->
    <template v-for="(route, index) in routeList">
      <template v-if="!route.hidden">
        <template v-if="hasOneShowingChild(route.children, route) && !route.alwaysShow">
          <appLink :to="route.path" :target="isHttp(route.path)">
            <a-menu-item
              :key="
                route.path == '/'
                  ? onlyOneChild.path
                  : !route.alwaysShow && route.children && route.children.length === 1
                  ? route.children[0].path
                  : route.path
              "
            >
              <template #icon>
                <Icons
                  :icon="
                    route.path == '/'
                      ? onlyOneChild.meta.icon
                      : !route.alwaysShow && route.children && route.children.length === 1
                      ? route.children[0].meta.icon
                      : route.meta.icon
                  "
                  size="19"
                />
              </template>
              <span>{{
                route.path === '/'
                  ? onlyOneChild.meta.title
                  : !route.alwaysShow && route.children && route.children.length === 1
                  ? route.children[0].meta.title
                  : route.meta.title
              }}</span>
            </a-menu-item>
          </appLink>
        </template>
        <template v-else>
          <a-sub-menu :key="route.path">
            <template #icon>
              <Icons :icon="route.meta.icon" size="19" />
            </template>
            <template #title>
              <span>{{ route.meta.title }}</span>
            </template>
            <SideBarItem v-for="child in route.children" :key="child.path" :menu-item="child" />
          </a-sub-menu>
        </template>
      </template>
    </template>
  </a-menu>
</template>
<script setup>
import SideBarItem from './SideBarItem.vue'
import appLink from '@/components/common/appLink'
import Icons from '@/components/common/icon'
import { useAppStore, useTabStore, usePermissionStore } from '@/store'
import { listenerRouteChange } from '@/utils/route-listener'
import { isHttp } from '@/utils/utils'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routerTag = useTabStore()
const router = useRouter()
const route = useRoute()

const routeList = computed(() => permissionStore.sidebarRouters)
const openKeys = ref([])
const selectedKeys = ref([])
const onlyOneChild = ref(null)

listenerRouteChange((e) => {
  findMenuItem(routeList.value, e.path)
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

function findRouteChange(data, path) {
  data.forEach((item) => {
    if (item.path === path) {
      if (!selectedKeys.value.includes(item.path)) {
        selectedKeys.value.push(item.path)
      }
      if (item.path.split('/').length - 1 >= 2) {
        let list = findOpenKey(routeList.value, item, openKeys.value)
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

watch(
  () => router.currentRoute.value,
  (n) => {
    selectedKeys.value = []
    findRouteChange(routeList.value, n.path)
  },
  { immediate: true }
)
onMounted(async () => {
  await routerTag.initTabBar(routeList.value, route.path)
})
</script>
<style lang="less" scoped></style>
