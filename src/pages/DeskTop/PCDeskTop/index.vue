<script lang="ts" setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"

import IconGroup from "@/pages/DeskTop/IconGroup/index.vue"
import Footer from "@/pages/DeskTop/Footer/index.vue"

import { openContextMenus } from "@/components/ClickMenu/index"

import LoginAudio from "@/assets/audio/login.mp3"

let timerID: number
const audio = ref<HTMLAudioElement>()

const { openMenu, closeMenu, isShow } = openContextMenus()

function closeTheMenu() {
  closeMenu()
}

onMounted(() => {
  window.addEventListener("click", closeTheMenu)
})

nextTick(() => {
  audio.value?.play()
})

onBeforeUnmount(() => {
  if (timerID) clearInterval(timerID)
  window.removeEventListener("click", closeTheMenu)
})
</script>
<template>
  <div
    id="PCDesktop"
    class="relative w-full h-full bg-[url(src/assets/desktopBackground.jpg)] bg-center"
  >
    <div class="w-full h-full flex flex-col">
      <!-- content -->
      <div class="w-full grow flex">
        <IconGroup />
      </div>

      <!-- footer left -->
      <Footer />
    </div>
    <audio ref="audio" :src="LoginAudio">不支持</audio>
  </div>
</template>
