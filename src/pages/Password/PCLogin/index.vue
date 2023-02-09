<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, CSSProperties } from "vue"

import { sleep } from "@/utils/sleep"

const wrapper = ref<HTMLDivElement>()
const avatarBox = ref<HTMLDivElement>()

const isHover = ref<boolean>(false)
const canSlide = ref<boolean>(false)
const avatarBoxOffsetHeight = ref<number>(92)
const avatarBoxOffsetWidth = ref<number>(0)
const wrapperOffsetWidth = ref<number>(0)
const avatarSwiperRect = reactive({
  startClientX: 0,
  offsetLeft: 0, // key point: the distance between wrapper'left and StartClientX
})

const wrapperStyle = computed<CSSProperties>(() => {
  return {
    height: isHover.value ? `9.5rem` : `12rem`,
    width: isHover.value ? `70%` : `80%`,
    padding: isHover.value ? `0` : `2%`,
    boxShadow: isHover.value
      ? `1px 1px 5px 1px #4b5cc4`
      : `0px 1px 8px 1px rgba(255,255,255,0.2)`,
    transition: `all 1s `,
  }
})

const avatarBoxStyle = computed<CSSProperties>(() => {
  return {
    border: isHover.value ? `1px solid black` : `0.5px solid white`,
    boxShadow: isHover.value ? `` : `1px 1px 10px 2px black`,
    transition: `all 1s`,
  }
})

//tips: ready to slide.
function collectSlideData() {
  avatarBoxOffsetWidth.value = avatarBox.value?.offsetWidth ?? 0 //99
  wrapperOffsetWidth.value = wrapper.value?.offsetWidth ?? 0 //405
}

function onMouseEnterAvatar() {
  isHover.value = true
}

function onMouseLeaveAvatar() {
  isHover.value = false
}

function onMouseDown(e: MouseEvent) {
  avatarSwiperRect.startClientX = e.clientX
  avatarSwiperRect.offsetLeft = e.offsetX
}

function onMouseMove(e: MouseEvent) {
  if (!canSlide.value) return
  e.preventDefault()
  const _MAX_DISTANCE =
    wrapperOffsetWidth.value -
    avatarBoxOffsetWidth.value +
    avatarSwiperRect.offsetLeft

  let moveX: number = e.clientX - avatarSwiperRect.startClientX

  if (moveX > 0) {
    moveX = moveX > _MAX_DISTANCE ? _MAX_DISTANCE : moveX
  }

  if (moveX < 0) {
  }

  avatarBox.value!.style.transition = "all 0.1s"
  avatarBox.value!.style.transform = `translateX(${moveX}px)`
}

watch(isHover, async (newValue, oldValue) => {
  if (!newValue) {
    canSlide.value = false
    avatarBox.value!.style.transform = `translateX(0px)`
    return
  } // if mouse move leave,noting to do
  await sleep(1000)
  if (!isHover.value) {
    canSlide.value = false
    return
  }
  collectSlideData()
  canSlide.value = true
})

nextTick(() => {
  avatarBoxOffsetHeight.value = avatarBox.value!.offsetHeight
})
</script>
<template>
  <div class="w-full h-full flex items-center">
    <div
      ref="wrapper"
      class="border-2px border-#44cef6 flex items-center rounded-1rem"
      :style="wrapperStyle"
    >
      <div
        ref="avatarBox"
        :style="avatarBoxStyle"
        class="h-fit border-white border-0.2px rounded-1rem overflow-hidden"
        @mouseenter.stop="onMouseEnterAvatar"
        @mouseleave.stop="onMouseLeaveAvatar"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup=""
      >
        <img
          class="block h-9rem object-contain"
          src="@/assets/avatar.jpg"
          draggable="false"
        />
      </div>

      <div
        v-if="!isHover"
        class="ml-2rem skew-x--20"
        :style="[
          isHover ? { opacity: 0 } : { opacity: 1 },
          { transition: `all 2s` },
        ]"
      >
        <span class="text-3rem font-600">向右拖拽解锁</span>
      </div>

      <div v-else="isHover"></div>
    </div>
  </div>
</template>
