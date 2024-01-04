<template>
  <template v-if="!menuItem.children && !menuItem.alwaysShow">
    <appLink :to="menuItem.path" :target="isHttp(menuItem.path)">
      <a-menu-item :key="menuItem.path">
        <template #icon>
          <Icons v-if="layoutMode == 1" :icon="menuItem.meta.icon" size="19" />
        </template>
        <span>{{ menuItem.meta.title }}</span>
      </a-menu-item>
    </appLink>
  </template>

  <template v-else>
    <a-sub-menu :key="menuItem.path">
      <template #icon>
        <Icons v-if="layoutMode == 1" :icon="menuItem.meta.icon" size="19" />
      </template>
      <template #title>
        <span>{{ menuItem.meta.title }}</span>
      </template>
      <SidebarItem v-for="child in menuItem.children" :key="child.path" :menu-item="child" />
    </a-sub-menu>
  </template>
</template>
<script setup name="SidebarItem">
import Icons from '@/components/common/icon'
import appLink from '@/components/common/appLink'
import { isHttp } from '@/utils/utils'
import { useMenuLayout } from '@/hooks/menuLayout'

const props = defineProps({
  menuItem: {
    type: [Array, Object],
    required: true,
  }
})
const { layoutMode } = useMenuLayout()
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
</style>
