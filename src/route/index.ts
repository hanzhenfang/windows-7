import { createRouter, createWebHashHistory } from "vue-router"

import Loading from "@/pages/Loading/index.vue"
import Password from "@/pages/Password/index.vue"
import DeskTop from "@/pages/DeskTop/index.vue"

export const route = createRouter({
  history: createWebHashHistory("/"),
  routes: [
    {
      path: "/",
      redirect: "/loading",
      children: [
        {
          path: "loading",
          name: "loading",
          component: Loading,
        },

        {
          path: "password",
          name: "password",
          component: Password,
        },
        {
          path: "desktop",
          name: "desktop",
          component: DeskTop,
        },
      ],
    },
  ],
})
