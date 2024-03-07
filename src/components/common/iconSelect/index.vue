<template>
  <div class="icon_info">
    <a-input v-model="iconName" allow-clear placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
      <template #suffix>
        <Icon :icon="'search'" />
      </template>
    </a-input>
  </div>
  <div class="icon_list">
    <div
      v-for="item in iconList.slice((current - 1) * pageSize, current * pageSize)"
      :key="item.name"
      class="icon_wrapper"
      @click="selectedIcon(item.name)"
    >
      <div :class="['icon_item', { active: activeIcon === item.name }]" :title="item.name">
        <Icon :icon="item.name" />
      </div>
    </div>
    <a-pagination v-model:current="current" v-model:page-size="pageSize" :total="iconList.length" simple />
  </div>
</template>

<script setup>
import icons from '@/config/icons.json'
import { onMounted } from 'vue'

const props = defineProps({
  activeIcon: {
    type: String,
  },
})
const emit = defineEmits(['selected'])

const iconList = ref(icons)
const cloneIconList = ref([])
const iconName = ref('')
const current = ref(1)
const pageSize = ref(24)

const selectedIcon = name => {
  emit('selected', name)
}
const filterIcons = () => {
  if (iconName.value) {
    iconList.value = cloneIconList.value.filter(item => item.indexOf(iconName.value) !== -1)
  } else {
    iconList.value = cloneIconList.value
  }
}
const reset = () => {
  iconName.value = ''
  iconList.value = cloneIconList.value
}
defineExpose({
  reset,
})
onMounted(() => {
  cloneIconList.value = iconList.value
})
</script>

<style lang="less" scoped>
.icon_info {
  width: 100%;
}
.icon_list {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  .icon_wrapper {
    margin: 8px 12px;
    display: flex;
    cursor: pointer;
    .icon_item {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid var(--color-border);
      .i-icon {
        display: flex;
      }
      &:hover {
        background-color: var(--color-fill-2);
      }
    }
    .icon_item.active {
      background-color: var(--color-fill-2);
    }
  }
}
.arco-pagination {
  flex: 1;
  justify-content: center;
  margin-top: 10px;
}
</style>
