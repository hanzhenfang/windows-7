<script lang="ts" setup>
import { ref, nextTick } from "vue"

import Menu from "@/components/ClickMenu/Menu.vue"

import LoginAudio from "@/assets/audio/login.mp3"

const audio = ref<HTMLAudioElement>()

nextTick(() => {
  // audio.value?.play()
})
</script>
<template>
  <div
    class="w-full h-full bg-[url(src/assets/desktopBackground.jpg)] bg-center"
  >
    <audio ref="audio" :src="LoginAudio">不支持</audio>
  </div>
</template>
