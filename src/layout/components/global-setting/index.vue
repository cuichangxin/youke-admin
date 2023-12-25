<template>
  <div v-if="!appStore.navbar" class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
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
          pickerType="chrome"
          format="hex"
          :disableAlpha="true"
          :theme="theme"
          v-model:pureColor="pureColor"
          v-model:gradientColor="gradientColor"
          @pureColorChange="pureColorChange"
        />
        <span>{{ pureColor }}</span>
      </div>
    </div>
    <a-divider />
    <Block :options="contentOpts" :title="'内容区域'" />
    <a-divider />
    <Block :options="othersOpts" :title="'其他设置'" />
    <a-divider />
    <a-alert>配置之后是临时生效，如需永久保存，点击下方的“保存配置”按钮。</a-alert>
  </a-drawer>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store'
import Block from './block.vue'
import { cloneDeep } from 'lodash'
import { useThemeMode } from '@/hooks/themeMode'

const emit = defineEmits(['cancel'])

const { sysColor } = useThemeMode()
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
  // {
  //   name: '菜单来源后台',
  //   key: 'menuFromServer',
  //   defaultVal: appStore.menuFromServer,
  // },
  {
    name: '菜单宽度',
    key: 'menuWidth',
    defaultVal: appStore.menuWidth,
    type: 'number',
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
])
const pureColor = ref(appStore.themeColor)
const gradientColor = ref('linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)')

const pureColorChange = (color) => {
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
.theme-box{
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
:deep(.vc-color-wrap){
  width: 80px !important;
}
</style>
