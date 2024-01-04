<script setup>
import GlobalSetting from './layout/components/global-setting/index.vue'
import { useMenuLayout } from '@/hooks/menuLayout'

const { layoutMode } = useMenuLayout()

nextTick(() => {
  const settings = JSON.parse(localStorage.getItem('arco-setting'))
  if (settings.theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  }else {
    document.body.removeAttribute('arco-theme')
  }
  // 延时处理，此时路由还不能获取
  setTimeout(() => {
    layoutMode.value = settings.layoutMode 
  },600)
})
</script>

<template>
  <router-view />
  <global-setting />
</template>
<style lang="less" scoped></style>
