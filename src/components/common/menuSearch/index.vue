<template>
  <a-modal
    v-model:visible="visible"
    :top="160"
    :align-center="false"
    :footer="false"
    :closable="false"
    :render-to-body="false"
    popup-container="search_box"
  >
    <div class="navbar-search-wrapper">
      <div class="navbar-search-input">
        <div class="navbar-search-input-left">
          <Icon :icon="'search'" class="search-icon" />
          <input ref="inputRef" type="text" placeholder="Search" @input="onChange" />
        </div>
        <div class="navbar-search-input-right">
          <div class="navbar-search-input-key-word">退出</div>
          <div class="navbar-search-input-key" style="width: 29px">ESC</div>
        </div>
      </div>
      <div class="navbar-search-content" :style="{ padding: searchList.length > 0 ? '24px' : '' }">
        <div v-if="!empty">
          <div v-for="route in searchList" :key="route.item.path">
            <div class="navbar-search-content-item" @click="clickItem(route)">
              <div class="item-title">
                <Icon class="navbar-search-content-icon" :icon="route.item.icon" />
                <span :innerHTML="route.item.title.join(' > ')"></span>
              </div>
              <Icon class="navbar-search-content-icon corner" :icon="'corner-down-left'" />
            </div>
          </div>
        </div>
        <a-empty v-else />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import Icon from '@/components/common/icon/index.vue'
import { usePermissionStore } from '@/store'
import Fuse from 'fuse.js'
import { isHttp } from '@/utils/utils'
import { cloneDeep } from 'lodash'
import { ref, computed, nextTick, watchEffect, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const permissionStore = usePermissionStore()
const inputRef = ref(null)
const searchList = ref([])
const routes = computed(() => permissionStore.routes)
const searchPool = ref([])
const fuse = ref(null)
const empty = ref(false)
let timer = null

const visible = ref(false)
const showModal = () => {
  visible.value = true
  searchList.value = []
  inputRef.value.value = ''
  nextTick(() => {
    inputRef.value.focus()
  })
}
const hideModal = () => {
  visible.value = false
}

const onChange = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const regExp = new RegExp(inputRef.value.value, 'g')
    // cloneDeep 为了阻止v-html更新层层嵌套的问题
    searchList.value = cloneDeep(fuse.value.search(inputRef.value.value))
    searchList.value.forEach(item => {
      item.item.title = item.item.title
        .join(',')
        .replace(
          regExp,
          `<mark class="mark" style="background:none;color: rgb(var(--primary-6));">${inputRef.value.value}</mark>`,
        )
        .split(',')
    })
    if (inputRef.value.value !== '' && searchList.value.length <= 0) {
      empty.value = true
    } else {
      empty.value = false
    }
  }, 500)
}
const clickItem = route => {
  let name = route.item.path.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
  if (isHttp(route.item.path)) {
    window.open(route.item.path)
  } else {
    router.push({ name: name })
  }
  hideModal()
}

function generateRoutes(routes, prefixTitle = []) {
  let res = []
  for (let r of routes) {
    if (r.hidden) continue
    const data = {
      path: r.path,
      title: [...prefixTitle],
      icon: r?.meta?.icon,
    }
    if (r.meta && r.meta.title) {
      if (r.redirect !== 'noRedirect') {
        data.title = [...data.title, r.meta.title]
        res.push(data)
      }
    }
    if (r.children) {
      const tempRoutes = generateRoutes(r.children, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

function initFuse(list) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.5,
      },
      {
        name: 'path',
        weight: 0.3,
      },
      {
        name: 'icon',
        weight: 0.2,
      },
    ],
  })
}

defineExpose({ showModal, hideModal })

watchEffect(() => {
  searchPool.value = generateRoutes(routes.value)
})
watch(searchPool, list => {
  initFuse(list)
})

onMounted(() => {
  searchPool.value = generateRoutes(routes.value)
})
</script>

<style lang="less" scoped>
.navbar-search-wrapper {
  font-size: 14px;
  color: var(--color-text-1);
}
.navbar-search-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: var(--color-bg-3);
  border-bottom: 1px solid var(--color-border);
  .navbar-search-input-left {
    display: flex;
    align-items: center;
    width: 300px;
  }
  .navbar-search-input-right {
    display: flex;
  }
  input {
    border: none;
    outline: none;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    background-color: transparent;
    color: var(--color-text-1);
  }
  .search-icon {
    margin-right: 12px;
    color: rgb(var(--primary-6));
    font-size: 22px;
    display: flex;
  }
  .navbar-search-input-key-word {
    font-size: 12px;
    color: var(--color-text-3);
    margin-left: 8px;
    margin-right: 4px;
  }
  .navbar-search-input-key {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    height: 20px;
    left: 117px;
    top: 6px;
    background: #fff;
    border: 1px solid #c9cdd4;
    box-sizing: border-box;
    box-shadow: 0 1px #c9cdd4;
    border-radius: 3px;
    font-size: 12px;
    color: var(--color-text-3);
  }
}
body[arco-theme='dark'] .navbar-search-input-key {
  background: #202022;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px #ffffff1f;
  color: #fff6;
}
body[arco-theme='dark'] .navbar-search-content-item {
  box-shadow: 0 1px 3px 0 #5c5c5c;
}
.navbar-search-content {
  transition: height 0.3s ease-in-out;
  .navbar-search-content-item {
    background-color: var(--color-neutral-1);
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #d4d9e1;
    padding-left: 12px;
    width: 100%;
    min-height: 48px;
    color: var(--color-text-1);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    transition: 0.1s ease-in;
    cursor: pointer;
    &:hover {
      background-color: var(--color-fill-3);
      .corner {
        opacity: 1;
      }
    }
    .mark {
      color: #fff !important;
    }
  }
  .navbar-search-content-icon {
    font-size: 18px;
    display: flex;
    margin-right: 10px;
    transition: opacity 0.1s linear;
  }
  .corner {
    opacity: 0;
  }
}
.item-title {
  display: flex;
  align-items: center;
}
</style>
