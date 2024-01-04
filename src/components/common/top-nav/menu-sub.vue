<template>
  <template v-if="!menuItem.children && !menuItem.alwaysShow">
    <a-menu-item :key="menuItem.path">
      <template #icon>
        <Icons v-if="menuItem.meta.icon" :icon="menuItem.meta.icon" size="19" />
      </template>
      <span>{{ menuItem.meta.title }}</span>
    </a-menu-item>
  </template>

  <template v-else>
    <a-sub-menu :key="menuItem.path">
      <template #icon>
        <Icons :icon="menuItem.meta.icon" size="19" />
      </template>
      <template #title>
        <span>{{ menuItem.meta.title }}</span>
      </template>
      <menuSub v-for="child in menuItem.children" :key="child.path" :menu-item="child" />
    </a-sub-menu>
  </template>
</template>
<script setup name="menuSub">
import Icons from '@/components/common/icon'
import { isExternal, getNormalPath } from '@/utils/utils'

const props = defineProps({
  menuItem: {
    type: [Array, Object],
    required: true,
  },
})

const onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // 临时设置(将在只有一个显示子节点时使用)
      onlyOneChild.value = item
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

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  return getNormalPath(routePath)
}
</script>
<style lang="less" scoped>
.arco-menu-item {
  display: flex;
  align-items: center;
}
:deep(.i-icon) {
  display: flex;
  align-items: center;
}

:deep(.active-menu-selected) {
  .arco-menu-title,
  .arco-menu-icon {
    color: rgb(var(--primary-6)) !important;
  }
  &::before {
    content: '';
    position: absolute;
    right: 12px;
    bottom: -14px;
    left: 12px;
    height: 3px;
    background-color: rgb(var(--primary-6));
  }
}
</style>
