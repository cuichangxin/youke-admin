<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :default-value="defaultValue"
    @change="handleChange"
  />
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
    default: false,
  },
  defaultValue: {
    type: [String, Boolean, Number],
    default: '',
  },
})
const switchStatus = computed(() => {
  if (props.status == 3 && props.name == 'navbar') {
    return true
  }
  if (props.status == 2 && props.name == 'menu') {
    return true
  } else {
    return false
  }
})
const emit = defineEmits(['inputChange'])
const handleChange = (value) => {
  emit('inputChange', {
    value,
    key: props.name,
  })
}
</script>
