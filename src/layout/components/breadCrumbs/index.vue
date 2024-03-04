<template>
  <transition-group name="breadcrumb">
    <a-breadcrumb class="container-breadcrumb" :key="$route.path">
      <a-breadcrumb-item>
        <Icon :icon="'all-application'" />
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        {{ item.meta.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </transition-group>
</template>

<script setup>
import router from '../../../router'

const route = useRoute()
const levelList = ref(null)

function getBreadCrumb() {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
function isDashBroad(route) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'index'.toLocaleLowerCase()
}
watch(
  () => router.currentRoute.value,
  () => {
    getBreadCrumb()
  }
)

onMounted(() => {
  getBreadCrumb()
})
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;
  // padding: 0 20px;
  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));
    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
.i-icon{
  display: flex;
}
</style>
