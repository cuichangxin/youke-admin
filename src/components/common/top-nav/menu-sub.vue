<template>
  <template v-if="!menuItem.children && !menuItem.alwaysShow">
    <a-menu-item :key="menuItem.path">
      <template #icon>
        <Icon :icon="menuItem.meta.icon" size="19" />
      </template>
      <span>{{ menuItem.meta.title }}</span>
    </a-menu-item>
  </template>

  <a-sub-menu v-else :key="menuItem.path">
    <template #icon>
      <Icon :icon="menuItem.meta.icon" size="19" />
    </template>
    <template #title>
      <span>{{ menuItem.meta.title }}</span>
    </template>
    <menuSub v-for="child in menuItem.children" :key="child.path" :menu-item="child" />
  </a-sub-menu>
</template>

<script setup name="menuSub">
const props = defineProps({
  menuItem: {
    type: [Array, Object],
    required: true,
  },
})
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
