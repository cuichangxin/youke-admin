<script setup>
import GlobalSetting from './layout/components/global-setting/index.vue'
nextTick(() => {
  const dark = JSON.parse(localStorage.getItem('arco-setting')).theme
  if (dark === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  }else {
    document.body.removeAttribute('arco-theme')
  }
})
</script>

<template>
  <router-view />
  <global-setting />
</template>
<style lang="less" scoped></style>
