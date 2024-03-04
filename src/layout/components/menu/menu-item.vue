<template>
  <template v-if="!item.hidden">
    <template
      v-if="!item.children && !item.alwaysShow">
      <a-menu-item :key="item.path">
        <template #icon>
          <Icon :icon="item.meta.icon" size="19" />
        </template>
        {{ item.meta.title }}
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="item.path" :title="item.meta.title">
      <template #icon>
        <Icon :icon="item.meta.icon" size="19" />
      </template>

      <menu-item v-for="childrenRoute in item.children" :key="childrenRoute.path" :item="childrenRoute" />
    </a-sub-menu>
  </template>
</template>
<script setup name="menuItem">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
