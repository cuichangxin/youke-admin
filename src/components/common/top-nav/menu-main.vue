<template>
  <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="menuClick">
    <template v-for="(item, index) in topMenus">
      <template v-if="item.children && item.children.length > 0">
        <a-sub-menu :key="item.path">
          <template #icon>
            <Icons v-if="item.meta && item.meta.icon" :icon="item.meta.icon" size="17" />
          </template>
          <template #title>
            <div style="display: inline-block">
              {{ item.meta.title }}
            </div>
          </template>
          <menuSub v-for="routSub in item.children" :key="routSub.path" :menu-item="routSub"></menuSub>
        </a-sub-menu>
      </template>

      <template v-else>
        <a-menu-item :key="item.key">
          <template #icon>
            <Icons v-if="item.meta && item.meta.icon" :icon="item.meta.icon" size="17" />
          </template>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script setup>
import { usePermissionStore } from '@/store'
import Icons from '@/components/common/icon'
import menuSub from './menu-sub.vue'

const router = useRouter()
const permissionStore = usePermissionStore()
const routes = computed(() => permissionStore.topbarRouters)
const selectedKeys = ref([])
const topMenus = computed(() => {
  let topMenus = []
  router.options.routes.map((menu) => {
    if (menu.hidden !== true) {
      if (menu.path === '/') {
        topMenus.push(menu.children[0])
      } else {
        topMenus.push(menu)
      }
    }
  })
  return topMenus
})

const menuClick = (key) => {
  console.log(key)
  if (!selectedKeys.value.includes(key)) {
    selectedKeys.value.push(key)
  }
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

watch(
  () => router.currentRoute.value,
  (n) => {
    // selectedKeys.value = []
    // findRouteChange(router.options.routes, n.path)
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
