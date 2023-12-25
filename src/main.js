import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.less';
import axios from './api/api'
import router from './router';
import { createPinia } from 'pinia'
import '@/assets/styles/index.less'
// import './permission'
import directive from './directive'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const app = createApp(App)
const pinia = createPinia()

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.use(pinia)
app.use(Vue3ColorPicker)
directive(app)

app.config.globalProperties.$http = axios

app.mount('#app')
