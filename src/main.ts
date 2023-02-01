import { createApp } from "vue"
import App from "./App.vue"

import { route } from "@/route/index"

import "uno.css"
import "./global.css"

const app = createApp(App)

app.use(route)
app.mount("#app")
