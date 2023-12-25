import { defineStore } from "pinia";
import defaultSettings from '@/config/settings.json';

const arcoSetting = JSON.parse(localStorage.getItem('arco-setting'))

const useAppStore = defineStore('app', {
  state: () => {
    if (!arcoSetting) {
      return {...defaultSettings}
    }else {
      return {...arcoSetting}
    }
  },

  getters: {
    appCurrentSetting(state) {
      return { ...state }
    },
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
    updateThemeColor(color){
      this.themeColor = color
    }
  }
})

export default useAppStore