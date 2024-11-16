import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import 'element-plus/dist/index.css'
import './index.css'

// ResizeObserver polyfill
if (typeof window !== 'undefined') {
  const ResizeObserverPolyfill = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverPolyfill;
  }

  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('ResizeObserver loop')) return;
    originalWarn.apply(console, args);
  };
}

const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')