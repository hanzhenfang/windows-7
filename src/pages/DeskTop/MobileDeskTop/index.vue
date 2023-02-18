<script lang="ts" setup>
import { ref, nextTick } from "vue"

import IconGroup from "@/pages/DeskTop/IconGroup/index.vue"
import Footer from "@/pages/DeskTop/Footer/index.vue"

import DeskBg from "@/assets/deskbg.jpg"
import LoginAudio from "@/assets/audio/login.mp3"

const audio = ref<HTMLAudioElement>()

nextTick(() => {
  audio.value?.play()
})
</script>
<template>
  <div
    class="w-full h-full"
    :style="{ backgroundImage: `url(${DeskBg})`, backgroundPosition: `center` }"
  >
    <div class="w-full h-full flex flex-col">
      <div class="grow">
        <IconGroup />
      </div>
      <Footer />
    </div>
    <audio ref="audio" :src="LoginAudio">不支持</audio>
  </div>
</template>
