import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './plugins/router'
import vuex from './plugins/vuex'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.mount('#app')
