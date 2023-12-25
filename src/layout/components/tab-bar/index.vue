<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <tab-item v-for="(tag, index) in tagList" :key="index" :index="index" :item-data="tag" />
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script setup>
import { useAppStore, useTabStore } from '@/store'
import tabItem from './tab-item.vue'

const appStore = useAppStore()
const TabStore = useTabStore()

const affixRef = ref()
const tagList = computed(() => {
  return TabStore.getTabList
})
const offsetTop = computed(() => {
  return appStore.navbar ? 60 : 0
})
</script>

<style scoped lang="less">
.tab-bar-container {
  position: relative;
  background-color: var(--color-bg-2);
  .tab-bar-box {
    display: flex;
    padding: 0 0 0 20px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    .tab-bar-scroll {
      height: 32px;
      flex: 1;
      overflow: hidden;
      .tags-wrap {
        padding: 4px 0;
        height: 48px;
        white-space: nowrap;
        overflow-x: auto;

        :deep(.arco-tag) {
          display: inline-flex;
          align-items: center;
          margin-right: 6px;
          cursor: pointer;
          &:first-child {
            .arco-tag-close-btn {
              display: none;
            }
          }
        }
      }
    }
  }

  .tag-bar-operation {
    width: 100px;
    height: 32px;
  }
}
</style>
