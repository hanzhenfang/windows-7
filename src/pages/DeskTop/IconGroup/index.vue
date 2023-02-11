<script lang="ts" setup>
import { useRootStore } from "@/store/rootStore"
import { storeToRefs } from "pinia"

import { desktopIconGroup } from "./iconGroup"

const rootStore = useRootStore()
const { isMobile } = storeToRefs(rootStore)

function clickEvent() {
  if (isMobile.value) {
    window.location.href = "https://juejin.cn/user/3065861918435437"
  } else {
    window.open("https://juejin.cn/user/3065861918435437")
  }
}
</script>
<template>
  <div @click="clickEvent" class="w-full h-full pl-1% pt-1%">
    <div v-for="item in desktopIconGroup" class="w-full flex flex-col mb-1rem">
      <img class="w-5rem h-full object-contain mb-1rem" :src="item.icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
