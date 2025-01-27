import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

//format it like this instead of this
//app.use(createPinia())

pinia.use(({store}) => {
    store.router = markRaw(router)
})
//use it like this
app.use(createPinia())
app.use(router)

app.mount('#app')
