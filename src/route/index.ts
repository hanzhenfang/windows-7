import { createRouter, createWebHashHistory } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"

const route = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: "/",
      component: HelloWorld,
    },
  ],
})
