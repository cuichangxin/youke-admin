import { computed } from "vue";
import { useRoute } from 'vue-router'
import { useAppStore, usePermissionStore } from '@/store'
import layoutModeList from '@/config/menuLayout.json'

export function useMenuLayout() {
  const route = useRoute()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()

  const layoutMode = computed({
    get: () => appStore.layoutMode,
    set: val => {
      updateLayoutModel(val)
    }
  })
  const selectKeys = computed({
    get: () => appStore.selectKeys,
    set: val => {
      updateSelectedKeys(val)
    }
  })

  const updateLayoutModel = (layoutModel) => {
    const findFix = layoutModeList.find(item => item.value === layoutModel)
    updateMenuPosition(findFix.menuPosition)
    updateNavbar(findFix.navbarShow)
    updateSidebar(findFix.sidebarShow)
    updateRouteList(layoutModel, route)
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
  const updateSelectedKeys = (value) => {
    appStore.updateSelectedKeys(value)
  }
  const updateRouteList = async (value, route) => {
    if (value == 1) {
      if (route.matched[0].children.length <= 1) {
        appStore.updateSettings({
          menu: false
        })
      } else {
        appStore.updateSettings({
          menu: true
        })

      }
    }
    permissionStore.updateRouteList(value, route)
  }

  return {
    layoutMode,
    selectKeys,
    updateLayoutModel,
    updateMenuPosition,
    updateNavbar,
    updateSidebar,
    updateSelectedKeys
  }
}

export default useMenuLayout