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
