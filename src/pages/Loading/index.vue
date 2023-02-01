<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue"

const flicker = ref<boolean>(false)

let timerID: number
onMounted(() => {
  timerID = window.setInterval(() => {
    flicker.value = !flicker.value
  }, 700)
})

onBeforeMount(() => {
  if (!!timerID) clearInterval(timerID)
})
</script>
<template>
  <div class="w-full h-full bg-black">
    <div
      class="w-[20px] h-[25px] border-white"
      :class="flicker ? `border-b-2px` : ``"
    ></div>
  </div>
</template>
