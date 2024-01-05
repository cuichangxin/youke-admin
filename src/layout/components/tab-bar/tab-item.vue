<template>
  <a-dropdown trigger="contextMenu" :popup-max-height="false" @select="actionSelect">
    <span
      class="arco-tag arco-tag-size-medium arco-tag-checked"
      :class="{ 'link-activated': itemData.path === $route.fullPath }"
      @click="goto(itemData)"
    >
      <span class="tag-link">
        {{ itemData.title }}
      </span>
      <span
        class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
        @click.stop="tagClose(itemData, index)"
      >
        <icon-close />
      </span>
    </span>
    <template #content>
      <a-doption :disabled="disabledReload" :value="Eaction.reload">
        <icon-refresh />
        <span>重新加载</span>
      </a-doption>
      <a-doption class="sperate-line" :disabled="disabledCurrent" :value="Eaction.current">
        <icon-close />
        <span>关闭当前标签页</span>
      </a-doption>
      <a-doption :value="Eaction.others">
        <icon-swap />
        <span>关闭其它标签页</span>
      </a-doption>
      <a-doption :value="Eaction.all">
        <icon-folder-delete />
        <span>关闭全部标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useTabStore } from '@/store'
import { refreshPage } from '@/utils/utils'

const props = defineProps({
  itemData: {
    type: Object,
    default() {
      return []
    },
  },
  index: {
    type: Number,
    default: 0,
  },
})

const Eaction = {
  reload: 'reload',
  current: 'current',
  others: 'others',
  all: 'all',
}

const router = useRouter()
const route = useRoute()
const tabBarStore = useTabStore()

const goto = (tag) => {
  router.push({ path: tag.path })
}
const tagList = computed(() => {
  return tabBarStore.getTabList
})

const disabledCurrent = computed(() => {
  return props.index === 0
})
const disabledReload = computed(() => {
  return props.itemData.path !== route.fullPath
})

const tagClose = (tag, idx) => {
  tabBarStore.removeRouterTag(idx, tag)
  if (props.itemData.path === route.fullPath) {
    const latest = tagList.value[idx - 1] // 获取队列的前一个tab
    router.push({ path: latest.path })
  }
}

const actionSelect = async (value) => {
  const { itemData, index } = props
  if (value === Eaction.current) {
    tagClose(itemData, index)
  } else if (value === Eaction.others) {
    const filterList = tagList.value.filter((el, idx) => {
      return idx === 0 || idx === props.index
    })
    tabBarStore.freshRouterTag(filterList)
    router.push({ path: props.itemData.path })
  } else if (value === Eaction.all) {
    tabBarStore.clearRouterTag()
    router.push({ path: '/' })
  } else {
    refreshPage(router.currentRoute)
  }
}
</script>

<style scoped lang="less">
.tag-link {
  color: var(--color-text-2);
  text-decoration: none;
}
.link-activated {
  color: rgb(var(--link-6));
  .tag-link {
    color: rgb(var(--link-6));
  }
  & + .arco-tag-close-btn {
    color: rgb(var(--link-6));
  }
}
:deep(.arco-dropdown-option-content) {
  span {
    margin-left: 10px;
  }
}
.arco-dropdown-open {
  .tag-link {
    color: rgb(var(--danger-6));
  }
  .arco-tag-close-btn {
    color: rgb(var(--danger-6));
  }
}
.sperate-line {
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
