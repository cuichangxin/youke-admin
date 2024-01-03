<template>
  <span v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <a-menu-item :key="resolvePath(onlyOneChild.path)">
        <template #icon>
          <Icons
            v-if="onlyOneChild.meta.icon || item.meta.icon"
            :icon="onlyOneChild.meta.icon || item.meta.icon"
            size="19"
          />
        </template>
        <span>{{ onlyOneChild.meta.title }}</span>
      </a-menu-item>
    </template>

    <template v-else>
      <a-sub-menu :key="resolvePath(item.path)">
        <template #icon>
          <Icons :icon="item.meta.icon" size="19" />
        </template>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <TopBarItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </a-sub-menu>
    </template>
  </span>
</template>
<script setup name="TopBarItem">
import path from 'path-browserify'
import Icons from '@/components/common/icon'
import { isExternal } from '@/utils/utils'

const props = defineProps({
  item: {
    type: [Array, Object],
    required: true,
  },
  basePath: {
    type: String,
    default: '',
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
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
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
