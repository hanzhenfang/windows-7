import { createApp } from "vue"
import { route } from "@/route/index"
import { createPinia } from "pinia"

import App from "./App.vue"

import "uno.css"
import "./global.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(route)
app.mount("#app")
