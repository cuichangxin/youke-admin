import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.less';
import router from './router';
import { createPinia } from 'pinia'
import '@/assets/styles/index.less'
import directive from './directive'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import './permission'
import { initApp } from '@/components/common';

const app = createApp(App)
const pinia = createPinia()

app.use(ArcoVue)
app.use(router)
app.use(pinia)
app.use(Vue3ColorPicker)
directive(app)
initApp(app)

app.mount('#app')

console.log(` %c ${document.title} %c 启动成功！`, "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
