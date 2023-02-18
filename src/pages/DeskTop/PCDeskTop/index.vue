<script lang="ts" setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"

import IconGroup from "@/pages/DeskTop/IconGroup/index.vue"
import Footer from "@/pages/DeskTop/Footer/index.vue"

import { openContextMenus } from "@/components/ClickMenu/index"

import DeskBg from "@/assets/deskbg.jpg"
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
    class="relative w-full h-full bg-center"
    :style="{ backgroundImage: `url(${DeskBg})`, backgroundPosition: `center` }"
  >
    <div class="w-full h-full flex flex-col">
      <!-- content -->
      <div class="w-full grow flex">
        <div class="w-10% h-full">
          <IconGroup />
        </div>
        <div class="h-full grow flex items-center justify-center">
          <!-- <div class="text-100px text-black font-500">导航栏响应式交互</div> -->
        </div>
      </div>

      <!-- footer left -->
      <Footer />
    </div>
    <audio ref="audio" :src="LoginAudio">不支持</audio>
  </div>
</template>
