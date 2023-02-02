<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount } from "vue"

let timerID: number
const welcomText: string = "关注一下韩振方的掘金社区帐号吧～"
const textAreas = ref<HTMLSpanElement>()
const flicker = ref<boolean>(false)
const isFlicker = ref<boolean>(true)

//tips: user open the system in first time, let the cursor flicker.
function turnOnSystem() {
  let _startTime = Date.now()
  timerID = window.setInterval(() => {
    let _loadingTime = Date.now()
    if (_loadingTime - _startTime > 9000) {
      isFlicker.value = false
      clearInterval(timerID)
      return
    } else {
      flicker.value = !flicker.value
    }
  }, 500)
}

//tips: automatic printing some word.
function autoPrintText(text: string) {
  let _str = ""
  let _index = 0
  let _timerID: number = 0
  _timerID = window.setInterval(() => {
    if (_index > text.length - 1) {
      clearInterval(_timerID)
      return
    }
    _str = _str + text.substring(_index, _index + 1)
    textAreas.value!.innerText = _str
    _index++
  }, 500)
}

onMounted(() => {
  turnOnSystem()
  autoPrintText(welcomText)
})

onBeforeMount(() => {
  if (!!timerID) clearInterval(timerID)
})
</script>
<template>
  <div class="w-full h-full bg-black">
    <div v-if="isFlicker" class="w-full h-full flex">
      <div class="w-fit">
        <span ref="textAreas" class="text-1.8rem font-600"></span>
      </div>

      <div
        class="w-1.5rem h-2.2rem border-white"
        :class="flicker ? `border-b-0.3rem` : ``"
      ></div>
    </div>
    <Transition name="loading">
      <div
        v-if="!isFlicker"
        class="w-full h-full pt-10% pb-2% flex flex-col items-center justify-between"
      >
        <!-- icon  content -->
        <div class="max-w-50% relative">
          <div class="w-full flex">
            <span class="font-600 text-3rem self-end">Microsoft</span>
            <img class="grow" src="@/assets/WindowsXP.ico" />
          </div>

          <div class="w-full">
            <span class="text-white font-800 text-10rem leading-7rem"
              >Windows</span
            >
            <span
              class="absolute right--12rem bottom-2rem text-5rem text-red font-800"
              >XP</span
            >
          </div>
        </div>

        <!-- Progress bar content -->
        <div
          class="w-18rem h-2rem border-#7FBCDF border-0.25rem rounded-0.3rem flex items-center overflow-hidden"
        >
          <div
            v-for="item in 5"
            :class="[1, 5].includes(item) ? `bg-blue` : `bg-white`"
            class="progress w-1rem h-1.3rem rounded-0.1rem mr-0.1rem translate-x--5rem"
          ></div>
        </div>

        <!-- footer content -->
        <div class="w-full flex justify-between items-baseline">
          <span class="font-800 text-1rem leading-4.2rem">
            Copyright® HanZhenFang JueJin
          </span>
          <span class="font-600 text-3rem leading-">Microsoft</span>
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

@keyframes progress {
  from {
    transform: translateX(-5rem);
  }
  to {
    transform: translateX(18rem);
  }
}
.progress {
  animation: progress 1.3s linear infinite 1s;
}
</style>
