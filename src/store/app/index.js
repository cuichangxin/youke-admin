import { defineStore } from "pinia";
import defaultSettings from '@/config/settings.json';
import layoutModeList from '@/config/menuLayout.json'


const arcoSetting = JSON.parse(localStorage.getItem('arco-setting'))

const useAppStore = defineStore('app', {
  state: () => {
    if (!arcoSetting) {
      return {
        ...defaultSettings,
        layoutMode: layoutModeList[3].value,
        menuPosition: 'sidebar',
      }
    } else {
      return {
        ...arcoSetting,
        layoutMode: layoutModeList[3].value,
        menuPosition: 'sidebar',
      }
    }
  },

  getters: {
    appCurrentSetting(state) {
      return { ...state }
    },
    getMenuPosition(){
      return this.menuPosition
    }
  },
  // 等待完善
  actions: {
    toggleMenu(value) {
      this.hideMenu = value
    },
    toggleTheme(dark) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    updateSettings(partial) {
      this.$patch(partial);
    },
    updateThemeColor(color) {
      this.themeColor = color
    },
    updateLayoutMode(mode) {
      this.layoutMode = mode
    },
    updateMenuPosition(menuPosition) {
      this.menuPosition = menuPosition
    },
    updateNavbar(navbarShow) {
      this.navbar = navbarShow
    },
    updateSidebar(sidebarShow) {
      this.menu = sidebarShow
    },
  }
})

export default useAppStore