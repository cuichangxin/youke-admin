<template>
  <a-layout class="layout">
    <div v-if="navbar && layoutMode != 5" class="layout-navbar">
      <Navbar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          :style="{ paddingTop: navbar && layoutMode != 5 ? '60px' : '' }"
          breakpoint="xl"
          :width="menuWidth"
          :collapsed="collapsed"
          :collapsible="true"
          :hide-trigger="true"
        >
          <div
            v-if="layoutMode == 5"
            class="left-side"
            :style="{ background: menuColors === 'dark' ? 'var(--color-menu-dark-bg)' : 'var(--color-menu-light-bg)' }"
          >
            <a-space>
              <img class="logo_img" alt="logo" src="/favicon.ico" />
              <a-typography-title
                v-if="!collapsed"
                :style="{ margin: 0, fontSize: '18px', color: menuColors === 'dark' ? '#fff' : '#1d2129' }"
                >youke-admin</a-typography-title
              >
            </a-space>
          </div>
          <div class="menu-wrapper" :style="{ height: layoutMode == 5 ? 'calc(100% - 60px)' : '100%' }">
            <Menu />
          </div>
        </a-layout-sider>

        <a-layout class="layout-content" :style="paddingStyle">
          <div
            v-if="navbar && layoutMode == 5"
            class="layout-navbar layout-mode-5"
            :style="{ width: `calc(100% - ${menuWidth}px)`, left: collapsed ? '48px' : '' }"
          >
            <Navbar />
          </div>
          <TabBar v-if="appStore.tabBar" />
          <a-layout-content>
            <BreadCrumbs />
            <PageLayout />
          </a-layout-content>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { PageLayout, Menu, Navbar, TabBar, Footer, BreadCrumbs } from './components'
import { useAppStore } from '@/store'
import { useMenuLayout } from '@/hooks/menuLayout'

const { layoutMode } = useMenuLayout()

const appStore = useAppStore()
const collapsed = computed(() => appStore.menuCollapse)
const navbar = computed(() => appStore.navbar)
const renderMenu = computed(() => appStore.menu && !appStore.topMenu)
const hideMenu = computed(() => appStore.hideMenu)
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})
const isColorWeak = computed(() => appStore.colorWeak)
const greyMode = computed(() => appStore.greyMode)
const theme = computed(() => appStore.theme)
const footer = computed(() => appStore.footer)
const paddingStyle = computed(() => {
  const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {}
  const paddingTop = navbar.value ? { paddingTop: `${60}px` } : {}
  return { ...paddingLeft, ...paddingTop }
})
const menuColors = computed(() => appStore.menuColors)

onMounted(() => {
  if (theme.value === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
  layoutMode.value = appStore.layoutMode
  if (isColorWeak.value) {
    document.body.style.filter = 'invert(80%)'
  } else if (greyMode.value) {
    document.body.style.filter = 'grayscale(100%)'
  }
})
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  // left: 200px;
  z-index: 100;
  width: 100%;
  height: 60px;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &.layout-mode-5 {
    left: 200px;
  }
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  border-right: 1px solid var(--color-border);
  transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
  .left-side {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-menu-dark-bg);
    height: 60px;
    .arco-typography {
      color: var(--color-bg-1);
      font-size: 17px;
    }
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
.arco-layout-content {
  padding: 0 20px;
}
.logo_img {
  width: 25px;
  height: 25px;
}
</style>
