import { createRouter, createWebHashHistory } from "vue-router"

import Loading from "@/pages/Loading/index.vue"
import Password from "@/pages/Password/index.vue"

export const route = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: "/",
      redirect: "/loading",
    },
    {
      path: "/loading",
      component: Loading,
    },
    {
      path: "/password",
      component: Password,
    },
  ],
})
