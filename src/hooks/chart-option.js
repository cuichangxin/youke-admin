import { computed } from 'vue'
import { useAppStore } from '@/store'

export default function useChartOption(sourceOption) {
  const appStore = useAppStore()
  const isDark = computed(() => {
    return appStore.theme === 'dark'
  })
  const chartOption = computed(() => {
    return sourceOption(isDark.value)
  })
  return {
    chartOption,
  }
}
