<script setup>
import GlobalSetting from './layout/components/global-setting/index.vue'
import { useAppStore } from '@/store'
import { computed, onMounted } from 'vue'

const appStore = useAppStore()
const theme = computed(() => appStore.theme)
const isColorWeak = computed(() => appStore.colorWeak)
const greyMode = computed(() => appStore.greyMode)

onMounted(() => {
  if (theme.value === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
  if (isColorWeak.value) {
    document.body.style.filter = 'invert(80%)'
  } else if (greyMode.value) {
    document.body.style.filter = 'grayscale(100%)'
  }
})
</script>

<template>
  <router-view />
  <global-setting />
</template>

<style lang="less" scoped></style>
