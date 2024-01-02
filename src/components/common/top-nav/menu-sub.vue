<template>
  <template v-if="menuItem.children && menuItem.children.length > 0">
    <a-sub-menu :key="menuItem.path" :title="menuItem.title">
      <menu-sub
        v-for="childrenRoute in menuItem.children"
        :key="childrenRoute.path"
        :menu-item="childrenRoute"
      ></menu-sub>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="menuItem.path">
      {{ menuItem.meta.title }}
    </a-menu-item>
  </template>
</template>
<script setup name="SubMenu">
const props = defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="less" scoped></style>
