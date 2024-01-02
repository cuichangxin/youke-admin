import { computed } from "vue";
import { useAppStore } from '@/store'
import layoutModeList from '@/config/menuLayout.json'

export function useMenuLayout() {
  const appStore = useAppStore()
  const layoutMode = computed({
    get: () => appStore.layoutMode,
    set: val => {
      updateLayoutModel(val)
    }
  })

  const updateLayoutModel = (layoutModel)=> {
    const findFix = layoutModeList.find(item => item.value === layoutModel || layoutModeList[0])
    updateMenuPosition(findFix.menuPosition)
    updateNavbar(findFix.navbarShow)
    updateSidebar(findFix.sidebarShow)
    appStore.updateLayoutMode(layoutModel)
  }
  const updateMenuPosition = (menuPosition) => {
    appStore.updateMenuPosition(menuPosition)
  }

  const updateNavbar = (value) => {
    appStore.updateNavbar(value)
  }
  const updateSidebar = (value) => {
    appStore.updateSidebar(value)
  }

  return {
    layoutMode,
    updateLayoutModel,
    updateMenuPosition,
    updateNavbar,
    updateSidebar
  }
}