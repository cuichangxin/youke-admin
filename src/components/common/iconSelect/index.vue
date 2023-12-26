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
  'all-application',
  'bill',
  'bookmark',
  'bookmark-one',
  'config',
  'equalizer',
  'hamburger-button',
  'home',
  'lightning',
  'like',
  'more-app',
  'power',
  'setting',
  'setting-config',
  'setting-one',
  'setting-three',
  'setting-two',
  'system',
  'tool',
  'waterfalls-h',
  'bug',
  'caution',
  'harm',
  'key',
  'shield',
  'announcement',
  'application-effect',
  'compression',
  'data-file',
  'file-code',
  'file-code-one',
  'inbox',
  'inbox-in',
  'link',
  'permissions',
  'schedule',
  'source-code',
  'view-list',
  'page',
  'page-template',
  'tree-list',
  'anchor',
  'anchor-one',
  'anchor-round',
  'anchor-squre',
  'assembly-line',
  'branch-one',
  'branch-two',
  'branch',
  'link-cloud-sucess',
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
