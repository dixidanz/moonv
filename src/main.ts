import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import '@/assets/main.css'
import App from './App.vue'
import router from './router'
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages,
  datetimeFormats: {
    'en-US': {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    },
    'zh-TW': {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
