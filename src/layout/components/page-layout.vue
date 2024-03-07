<template>
  <router-view v-slot="{ Component, route }" class="page_info">
    <transition name="fade-transform" mode="out-in" appear>
      <keep-alive :include="caches">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { useKeepAlive } from '@/store'
import { toRefs } from 'vue'

const { caches } = toRefs(useKeepAlive())
</script>

<style lang="less" scoped>
.page_info {
  height: calc(100% - 60px);
}
</style>
