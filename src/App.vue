<script setup>
import GlobalSetting from './layout/components/global-setting/index.vue'
import { useAppStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()
nextTick(() => {
  const dark = JSON.parse(localStorage.getItem('arco-setting')).theme
  if (dark === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  }else {
    document.body.removeAttribute('arco-theme')
  }
})
onMounted(() => {
  appStore.setRouteList(router.options.routes)
})
</script>

<template>
  <router-view />
  <global-setting />
</template>
<style lang="less" scoped></style>
