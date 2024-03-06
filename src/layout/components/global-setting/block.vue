<template>
  <div class="block">
    <h5 class="title">{{ title }}</h5>
    <div v-for="option in options" :key="option.name" class="switch-wrapper">
      <div style="display: flex">
        <span style="margin-right: 4px">{{ option.name }}</span>
        <a-tooltip v-if="option.tooltip" :content="option.content">
          <Icon :icon="'help'" />
        </a-tooltip>
      </div>
      <form-wrapper
        :type="option.type || 'switch'"
        :name="option.key"
        :default-value="option.defaultVal"
        :status="switchStatus"
        @input-change="handleChange"
      />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import FormWrapper from './form-wrapper.vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default() {
      return []
    },
  },
})
const appStore = useAppStore()

const switchStatus = computed(() => appStore.layoutMode)

const handleChange = async ({ key, value }) => {
  if (key === 'colorWeak') {
    document.body.style.filter = value ? 'invert(80%)' : 'none'
  }
  if (key === 'greyMode') {
    document.body.style.filter = value ? 'grayscale(100%)' : 'none'
  }
  if (key === 'topMenu') {
    appStore.updateSettings({
      menuCollapse: false,
    })
  }
  appStore.updateSettings({ [key]: value })
}
</script>

<style scoped lang="less">
.block {
  margin-bottom: 24px;
}

.title {
  margin: 10px 0;
  padding: 0;
  font-size: 14px;
}

.switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin: 4px 0;
}
</style>
