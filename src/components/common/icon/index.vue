<!-- <script>
import { h, resolveDynamicComponent } from 'vue'
function Icons(props,ctx) {
  const Component = resolveDynamicComponent(`${props.icon}`)
  return h(Component,{size:props.size})
}
export default Icons
</script> -->
<template>
  <IconPark :type="icon" theme="outline" />
</template>
<script setup>
import { IconPark } from '@icon-park/vue-next/es/all'

const props = defineProps({
  icon:{
    type:String
  }
})
</script>
<style lang="less" scoped>

</style>
