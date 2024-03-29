<template>
  <div v-if="!appStore.navbar" class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <Icon :icon="'config'" />
      </template>
    </a-button>
  </div>
  <a-drawer
    :width="300"
    unmount-on-close
    :visible="visible"
    :cancel-text="'关闭'"
    :ok-text="'保存配置'"
    @ok="saveSettings"
    @cancel="cancel"
  >
    <template #title>页面配置</template>
    <div class="theme-box">
      <h5 class="title">主题色</h5>
      <div class="theme-info">
        <color-picker
          v-model:pureColor="pureColor"
          v-model:gradientColor="gradientColor"
          picker-type="chrome"
          format="hex"
          :disable-alpha="true"
          :theme="theme"
          @pure-color-change="pureColorChange"
        />
        <span>{{ pureColor }}</span>
      </div>
    </div>
    <a-divider />
    <div class="layout-box">
      <h5 class="title">布局</h5>
      <div class="layout-wrapper">
        <a-tooltip v-for="item in layoutModeList" :key="item.value" :content="item.details" position="br">
          <div
            class="chose-item"
            :class="[`mode_${item.value}`, { active: layoutMode == item.value }]"
            @click="changeMode(item.value)"
          ></div>
        </a-tooltip>
      </div>
    </div>
    <a-divider />
    <Block :options="contentOpts" :title="'内容区域'" />
    <a-divider />
    <Block :options="othersOpts" :title="'其他设置'" />
    <a-divider />
    <a-alert>配置之后是临时生效，如需保存，点击下方的“保存配置”按钮。</a-alert>
  </a-drawer>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store'
import Block from './block.vue'
import { cloneDeep } from 'lodash'
import { useThemeMode } from '@/hooks/themeMode'
import layoutModeList from '@/config/menuLayout'
import { useMenuLayout } from '@/hooks/menuLayout'
import { computed, ref, onMounted } from 'vue'

const emit = defineEmits(['cancel'])

const { sysColor } = useThemeMode()
const { layoutMode } = useMenuLayout()
const appStore = useAppStore()
const visible = computed(() => appStore.globalSettings)
const contentOpts = computed(() => [
  { name: '导航栏', key: 'navbar', defaultVal: appStore.navbar },
  {
    name: '菜单栏',
    key: 'menu',
    defaultVal: appStore.menu,
  },
  { name: '底部', key: 'footer', defaultVal: appStore.footer },
  { name: '多页签', key: 'tabBar', defaultVal: appStore.tabBar },
  { name: '全局加载', key: 'loading', defaultVal: appStore.loading, tooltip: true, content: '进入页面loading效果' },
  {
    name: '菜单宽度',
    key: 'menuWidth',
    defaultVal: appStore.menuWidth,
    type: 'number',
  },
  {
    name: '菜单配色',
    key: 'menuColors',
    defaultVal: appStore.menuColors,
    type: 'radioGroup',
  },
])
const theme = computed(() => {
  if (appStore.theme === 'dark') {
    return 'black'
  }
  return 'white'
})
const othersOpts = computed(() => [
  {
    name: '色弱模式',
    key: 'colorWeak',
    defaultVal: appStore.colorWeak,
  },
  {
    name: '灰色模式',
    key: 'greyMode',
    defaultVal: appStore.greyMode,
  },
])
const pureColor = ref(appStore.themeColor)
const gradientColor = ref('linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)')

const pureColorChange = color => {
  sysColor.value = color
}
const cancel = () => {
  appStore.updateSettings({ globalSettings: false })
  emit('cancel')
}
const saveSettings = async () => {
  const copy = cloneDeep(appStore.$state)
  const darkMode = document.body.getAttribute('arco-theme')
  copy.globalSettings = false
  copy.themeColor = sysColor.value
  if (darkMode === 'dark') {
    copy.theme = 'dark'
  } else {
    copy.theme = 'light'
  }
  localStorage.setItem('arco-setting', JSON.stringify(copy))
  Message.success('保存配置成功')
}
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true })
}
const changeMode = value => {
  if (layoutMode.value !== value) {
    layoutMode.value = value
  }
}
onMounted(() => {
  sysColor.value = pureColor.value
})
</script>

<style scoped lang="less">
.fixed-settings {
  position: fixed;
  top: 280px;
  right: 0;

  svg {
    font-size: 18px;
    vertical-align: -4px;
  }
}

.theme-box {
  margin-bottom: 20px;
}

.theme-info {
  display: flex;
  border: 1px solid var(--color-border);
  padding: 4px;
}

.title {
  margin: 10px 0;
  padding: 0;
  font-size: 14px;
}

:deep(.vc-color-wrap) {
  width: 80px !important;
}

.layout-wrapper {
  display: flex;
  justify-content: space-around;

  .chose-item {
    position: relative;
    width: 45px;
    height: 45px;
    overflow: hidden;
    cursor: pointer;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px #0000002e;

    &::before {
      content: '';
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 10px;
    }

    &::after {
      content: '';
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 10px;
    }

    &.active {
      border: 2px solid rgb(var(--primary-7));
    }

    &.mode_1 {
      &::before {
        content: '';
        top: 0;
        left: 0;
        z-index: 1;
        width: 30%;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }

      &::after {
        content: '';
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 30%;
        background-color: rgb(var(--primary-6));
      }
    }

    &.mode_2 {
      &::before {
        content: '';
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 30%;
        background-color: rgb(var(--primary-6));
      }
    }

    &.mode_3 {
      &::before {
        content: '';
        top: 0;
        left: 0;
        z-index: 1;
        width: 30%;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }
    }

    &.mode_4 {
      &::before {
        content: '';
        top: 0;
        left: 0;
        width: 30%;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }

      &::after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 27%;
        z-index: 1;
        background-color: #c8c8c8;
      }
    }
    &.mode_5 {
      &::before {
        content: '';
        top: 0;
        left: 0;
        z-index: 1;
        width: 30%;
        height: 100%;
        background-color: rgb(var(--primary-6));
      }

      &::after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 27%;
        background-color: #c8c8c8;
      }
    }
  }
}
</style>
