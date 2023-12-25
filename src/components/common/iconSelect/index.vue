<template>
  <div class="icon_info">
    <a-input v-model="iconName" allow-clear placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
      <template #suffix>
        <icon-search />
      </template>
    </a-input>
  </div>
  <OverlayScrollbarsComponent defer>
    <div class="icon_list">
      <div class="icon_wrapper" v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <div :class="['icon_item', { active: activeIcon === item }]">
          <icons :icon="item" size="19"></icons>
          <div class="icon_title">{{ item }}</div>
        </div>
      </div>
    </div>
  </OverlayScrollbarsComponent>
</template>
<script setup>
import icons from '../icon/index.vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const props = defineProps({
  activeIcon: {
    type: String,
  },
})
const emit = defineEmits(['selected'])

const iconList = ref([
  'icon-drag-arrow',
  'icon-heart-fill',
  'icon-star-fill',
  'icon-eye',
  'icon-heart',
  'icon-history',
  'icon-home',
  'icon-list',
  'icon-message-banned',
  'icon-message',
  'icon-poweroff',
  'icon-scan',
  'icon-settings',
  'icon-star',
  'icon-pen-fill',
  'icon-sun-fill',
  'icon-apps',
  'icon-archive',
  'icon-bar-chart',
  'icon-book',
  'icon-bookmark',
  'icon-bug',
  'icon-branch',
  'icon-bulb',
  'icon-calendar-clock',
  'icon-calendar',
  'icon-camera',
  'icon-command',
  'icon-common',
  'icon-compass',
  'icon-computer',
  'icon-dashboard',
  'icon-desktop',
  'icon-dice',
  'icon-email',
  'icon-empty',
  'icon-fire',
  'icon-idcard',
  'icon-layers',
  'icon-mind-mapping',
  'icon-mobile',
  'icon-nav',
  'icon-storage',
  'icon-sun',
  'icon-tool',
  'icon-user-add',
  'icon-user-group',
  'icon-user',
])
const cloneIconList = ref([])
const iconName = ref('')

const selectedIcon = (name) => {
  emit('selected', name)
}
const filterIcons = () => {
  if (iconName.value) {
    iconList.value = cloneIconList.value.filter((item) => item.indexOf(iconName.value) !== -1)
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
  max-height: 200px;
  display: flex;
  flex-wrap: wrap;
  .icon_wrapper {
    height: 26px;
    margin: 8px 3px;
    display: flex;
    cursor: pointer;
    .icon_item {
      display: flex;
      padding: 4px;
      .icon_title {
        font-size: 12px;
        margin-left: 3px;
      }
      &:hover {
        background-color: #ececec;
        border-radius: 5px;
      }
    }
    .icon_item.active {
      background-color: #ececec;
      border-radius: 5px;
    }
  }
}
</style>
