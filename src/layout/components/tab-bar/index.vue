<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <a-scrollbar style="overflow: auto">
            <div class="tags-wrap">
              <tab-item
                v-for="(tag, index) in tagList"
                :key="index"
                :index="index"
                :item-data="tag"
                :route-path="routePath"
                :parent-route-path="parentRoutePath"
              />
            </div>
          </a-scrollbar>
        </div>
      </div>
    </a-affix>
  </div>
</template>

<script setup>
import { useAppStore, useTabStore } from '@/store'
import tabItem from './tab-item.vue'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const appStore = useAppStore()
const TabStore = useTabStore()

const affixRef = ref()
const tagList = computed(() => {
  return TabStore.getTabList
})
const offsetTop = computed(() => {
  return appStore.navbar ? 60 : 0
})
const routePath = ref('')
const parentRoutePath = ref('')

watch(
  () => router.currentRoute.value,
  n => {
    const cutPath = n.path.split('/')
    const path = cutPath[cutPath.length - 1]
    const parentPath = cutPath[cutPath.length - 2]
    parentRoutePath.value = parentPath
    routePath.value = path
  },
  { immediate: true },
)
</script>

<style scoped lang="less">
.tab-bar-container {
  position: relative;
  background-color: var(--color-bg-2);

  .tab-bar-box {
    display: flex;
    padding: 0 20px;
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
}

.arco-scrollbar {
  height: 48px;
  position: static;
}

:deep(.arco-scrollbar-track-direction-horizontal) {
  bottom: -12px;

  .arco-scrollbar-thumb-bar {
    height: 6px;
  }
}
</style>
