<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue"

const flicker = ref<boolean>(false)
const isFlicker = ref<boolean>(true)

let timerID: number

//tips: user open the system in first time.
function turnOnSystem() {
  let _startTime = Date.now()
  timerID = window.setInterval(() => {
    let _loadingTime = Date.now()
    if (_loadingTime - _startTime > 2000) {
      isFlicker.value = false
      clearInterval(timerID)
      return
    } else {
      flicker.value = !flicker.value
    }
  }, 500)
}

onMounted(() => {
  turnOnSystem()
})

onBeforeMount(() => {
  if (!!timerID) clearInterval(timerID)
})
</script>
<template>
  <div class="w-full h-full bg-black">
    <div
      v-if="isFlicker"
      class="w-[20px] h-[25px] border-white"
      :class="flicker ? `border-b-4px` : ``"
    ></div>

    <Transition name="loading">
      <div
        v-if="!isFlicker"
        class="w-full h-full flex flex-col items-center justify-center"
      >
        <div class="w-50%">
          <div class="w-full flex">
            <span class="text-white font-600 text-30px self-end"
              >Microsoft</span
            >
            <img class="grow" src="@/assets/WindowsXP.ico" />
          </div>

          <div class="w-full">
            <span class="text-white font-800 text-100px leading-70px"
              >Windows</span
            >
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.loading-enter-from {
  opacity: 0;
}
.loading-enter-to {
  opacity: 1;
}

.loading-enter-active {
  transition: opacity 2s ease-in;
}
</style>
