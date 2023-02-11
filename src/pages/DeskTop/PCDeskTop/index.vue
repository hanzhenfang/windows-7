<script lang="ts" setup>
import { ref, nextTick, onMounted, onBeforeMount } from "vue"

import { openContextMenus } from "@/components/ClickMenu/index"

import LoginAudio from "@/assets/audio/login.mp3"

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

onBeforeMount(() => {
  window.removeEventListener("click", closeTheMenu)
})
</script>
<template>
  <div
    id="PCDesktop"
    class="relative w-full h-full bg-[url(src/assets/desktopBackground.jpg)] bg-center"
  >
    <div class="w-full h-full flex items-center justify-center"></div>
    <audio ref="audio" :src="LoginAudio">不支持</audio>
  </div>
</template>
