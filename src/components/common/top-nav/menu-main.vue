<template>
  <a-menu mode="horizontal" :selected-keys="[navSelectKeys]" @menu-item-click="clickMenu">
    <template v-for="route in routeList">
      <template v-if="!route.hidden">
        <template v-if="route.path == '/'">
          <a-menu-item :key="route.children[0].path">
            <template #icon>
              <Icon :icon="route.children[0].meta.icon" size="19" />
            </template>
            <span>{{ route.children[0].meta.title }}</span>
          </a-menu-item>
        </template>

        <template v-else-if="!route.hasOwnProperty('children')">
          <a-menu-item :key="route.path">
            <template #icon>
              <Icon :icon="route.meta.icon" size="19" />
            </template>
            <span>{{ route.meta.title }}</span>
          </a-menu-item>
        </template>

        <template v-else>
          <a-sub-menu :key="route.path" :title="route.meta.title">
            <template #icon>
              <Icon :icon="route.meta.icon" size="19" />
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
import { listenerRouteChange } from '@/utils/route-listener'
import { useTabStore, usePermissionStore, useAppStore } from '@/store'
import { isHttp } from '@/utils/utils'
import { useMenuLayout } from '@/hooks/menuLayout'

const { navSelectKeys, layoutMode } = useMenuLayout()
const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const routeList = computed(() => permissionStore.topbarRouters)
const routes = computed(() => permissionStore.routes)

listenerRouteChange(e => {
  const cutPath = e.path.split('/'),
    path = cutPath[cutPath.length - 1]
  findMenuItem(routeList.value, path)

  changeSelectKey(cutPath, path)
})

const clickMenu = key => {
  navSelectKeys.value = key
  if (appStore.layoutMode == 1) {
    let nowMenu

    if (key === '/dashboard') {
      nowMenu = routes.value.find(item => item.path === '/').children[0]
    } else {
      nowMenu = routes.value.find(item => item.path === key)
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
  data.forEach(item => {
    if (item.path === path) {
      tabStore.updateTabList(item)
    } else if (item?.children) {
      findMenuItem(item.children, path)
    }
  })
}

function updateSideBarMenu(key) {
  const routeList = routes.value
    .map(item => {
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

function changeSelectKey(cutPath, path) {
  if (layoutMode.value === '1') {
    navSelectKeys.value = '/' + cutPath[1]
  }
  if (layoutMode.value === '2') {
    navSelectKeys.value = cutPath.includes('index') ? `/${path}` : path
  }
}

watch(
  () => layoutMode.value,
  n => {
    const cutPath = route.path.split('/'),
      path = cutPath[cutPath.length - 1]
    changeSelectKey(cutPath, path)
  },
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
