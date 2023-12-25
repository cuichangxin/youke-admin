import { computed, unref, watch } from "vue"
import { changeArcoPrimaryColor } from "@/utils/utils"
import { useAppStore } from '@/store'

export function useThemeMode() {
  const appStore = useAppStore()

  const darkAppTheme = computed({
    get: () => appStore.theme === "dark",
    set: val => updateAppTheme(val)
  })
  const sysColor = computed({
    get: () => appStore.themeColor,
    set: (color) => {
      updateThemeColor(color)
    }
  })

  const updateThemeColor = (color) => {
    appStore.updateThemeColor(color)
    changeArcoPrimaryColor(color, darkAppTheme.value)
  }
  //  改变theme也会改变主题色
  watch([() => unref(darkAppTheme)], ([darkAppTheme]) => {
    changeArcoPrimaryColor(sysColor.value,darkAppTheme)
  })

  return {
    darkAppTheme,
    sysColor,
    updateThemeColor
  }
}

export default useThemeMode