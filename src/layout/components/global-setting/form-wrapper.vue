<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :default-value="defaultValue"
    @change="handleChange"
  />
  <a-radio-group
    v-else-if="type === 'radioGroup'"
    type="button"
    :model-value="defaultValue"
    size="small"
    @change="handleChange"
  >
    <a-radio value="light">白天</a-radio>
    <a-radio value="dark">夜晚</a-radio>
  </a-radio-group>
  <a-switch
    v-else
    :default-checked="defaultValue"
    :disabled="switchStatus"
    :model-value="defaultValue"
    size="small"
    @change="handleChange"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  status: {
    type: [String, Number],
  },
  defaultValue: {
    type: [String, Boolean, Number],
    default: '',
  },
})
const switchStatus = computed(() => {
  if (
    (props.status == 3 && props.name == 'navbar') ||
    (props.status == 2 && props.name == 'menu') ||
    (props.status == 1 && props.name == 'menu')
  ) {
    return true
  } else {
    return false
  }
})
const emit = defineEmits(['inputChange'])
const handleChange = value => {
  emit('inputChange', {
    value,
    key: props.name,
  })
}
</script>
