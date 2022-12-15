import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupErrorHandler } from './common/error-handler'

import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/overlay.scss'

import './assets/style/index.scss'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)

setupErrorHandler(app)

router.isReady().then(() => {
  app.mount('#app')
})
