<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeMount } from "vue"

//some constants
let timerID: number
const welcomText: string = "关注一下韩振方的掘金社区帐号吧～" // will automatic printing when user first enter the page
const cursorFlickerFrequency: number = 200 //control the cursor flicker frequency
const printTextTime: number = 10000 // control the duration of printing "some words page"
const printSpeed: number = 500 // control the speed of printing word , (one word)/(printSpeed)
const loadingTime: number = 13000 // control the duration of loadingPage
// *********************************************

const textAreas = ref<HTMLSpanElement>()
const flicker = ref<boolean>(false)
const isFlicker = ref<boolean>(true)
const isLoading = ref<boolean>(false)

//tips: if user open the system in first time, make the cursor flicker.
function turnOnSystem() {
  const _startPrintTime = Date.now()
  timerID = window.setInterval(() => {
    const _printPageTime = Date.now()
    if (_printPageTime - _startPrintTime > printTextTime) {
      clearInterval(timerID)
      isFlicker.value = false //cursor stop flicker
      isLoading.value = true //progress bar start loading
      return
    } else {
      flicker.value = !flicker.value
    }
  }, cursorFlickerFrequency)
}

//tips: automatic printing some words.
function autoPrintText(text: string) {
  let _str = ""
  let _index = 0
  const _timerID = window.setInterval(() => {
    if (_index > text.length - 1) {
      clearInterval(_timerID)
      return
    }
    _str = _str + text.substring(_index, _index + 1)
    textAreas.value!.innerText = _str
    _index++
  }, printSpeed)
}

//tips: read to password page
function stopTheLoadingPage() {
  if (isLoading.value === false) return
  let _startLoadingTime = Date.now()
  const _timerID = setInterval(() => {
    const _loadingPageTime = Date.now()
    if (_loadingPageTime - _startLoadingTime > loadingTime) {
      clearInterval(_timerID)
      isLoading.value = false
    }
  })
}

watch(isLoading, stopTheLoadingPage)

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
        v-if="isLoading"
        class="w-full h-full pt-10% pb-2% flex flex-col items-center justify-between"
      >
        <!-- icon  content -->
        <div class="w-full basis-45% flex flex-col items-center p-x-10%">
          <div class="flex w-full h-full justify-center">
            <div class="self-end">
              <span class="font-600 text-3rem"> Microsoft </span>
            </div>
            <div class="self-end overflow-hidden">
              <img class="w-full object-contain" src="@/assets/WindowsXP.ico" />
            </div>
          </div>

          <div class="relative">
            <span class="text-white font-800 text-7.5rem leading-7rem">
              Windows
            </span>
            <span
              class="absolute right--2rem bottom-4rem text-2rem text-red font-800"
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
        <div class="w-full flex justify-between items-baseline p-x-4%">
          <span class="font-800 text-1rem leading-4.2rem">
            Follow® HanZhenFang JueJin
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
  animation: progress 1.3s linear infinite 2s;
}
</style>
