<template>
  <a-space>
    <a-tooltip content="刷新">
      <a-button shape="circle" @click="refresh">
        <template #icon>
          <Icon :icon="'refresh'" />
        </template>
      </a-button>
    </a-tooltip>
    <a-tooltip v-if="columns" content="显隐列">
      <a-dropdown :hide-on-select="false">
        <a-button shape="circle">
          <template #icon>
            <Icon :icon="'application-two'" />
          </template>
        </a-button>
        <template #content>
          <a-doption v-for="column in columns" :key="column.title">
            <a-checkbox v-model="column.visible" @change="checkboxChange($event, column.title)">{{
              column.title
            }}</a-checkbox>
          </a-doption>
        </template>
      </a-dropdown>
    </a-tooltip>
  </a-space>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: [Object, Array],
  },
})

const emits = defineEmits(['refreshTable'])
const refresh = () => {
  emits('refreshTable')
}
const checkboxChange = (event, title) => {
  props.columns.filter(item => item.title === title)[0].visible = event
}
</script>

<style lang="less" scoped></style>
