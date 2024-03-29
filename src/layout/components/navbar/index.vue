<template>
  <div class="navbar">
    <div v-if="layoutMode != 5" class="left-side">
      <a-space>
        <img class="logo_img" alt="logo" src="/favicon.ico" />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5"> youke-admin </a-typography-title>
      </a-space>
    </div>
    <div class="center-side">
      <TopNav v-if="topNav && layoutMode != 5" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip content="搜索">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleSearch">
            <template #icon>
              <Icon :icon="'search'" />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
            <template #icon>
              <Icon v-if="theme === 'dark'" :icon="'moon'" />
              <Icon v-else :icon="'sun'" />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? '点击退出全屏模式' : '点击切换全屏模式'">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
            <template #icon>
              <Icon v-if="isFullscreen" :icon="'off-screen'" />
              <Icon v-else :icon="'full-screen'" />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="'页面配置'">
          <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
            <template #icon>
              <Icon :icon="'config'" />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" :src="avatar" />
          </a-avatar>

          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'MyCenter' })">
                <Icon :icon="'user'" />
                <span> 个人中心 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <Icon :icon="'logout'" />
                <span> 退出登录 </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
  <div class="search_box">
    <Search ref="searchRef" />
  </div>
</template>

<script setup>
import { useFullscreen, useToggle, useDark } from '@vueuse/core'
import { useUserStore, useAppStore } from '@/store'
import { cloneDeep } from 'lodash'
import TopNav from '@/components/common/top-nav/menu-main.vue'
import Search from '@/components/common/menuSearch/index.vue'
import { computed, ref, nextTick } from 'vue'

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()
const { logout, avatar } = useUserStore()
const appStore = useAppStore()
const theme = computed(() => {
  return appStore.theme
})
const topNav = computed(() => {
  if (appStore.layoutMode === '4' || appStore.layoutMode === '3') {
    return false
  } else {
    return true
  }
})
const layoutMode = computed(() => appStore.layoutMode)
const searchRef = ref(null)

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark) {
    appStore.toggleTheme(dark)
  },
})
const toggleTheme = useToggle(isDark)

const handleLogout = () => {
  logout()
}
const handleToggleTheme = () => {
  toggleTheme()
  const copy = cloneDeep(appStore.$state)
  nextTick(() => {
    const darkMode = document.body.getAttribute('arco-theme')
    if (darkMode === 'dark') {
      copy.theme = 'dark'
    } else {
      copy.theme = 'light'
    }
    copy.globalSettings = false
    localStorage.setItem('arco-setting', JSON.stringify(copy))
  })
}
const handleSearch = () => {
  searchRef.value.showModal()
}
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true })
}
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.logo_img {
  width: 25px;
  height: 25px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}

.search_box {
  :deep(.arco-modal-body) {
    padding: 0;
    border-radius: 8px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
