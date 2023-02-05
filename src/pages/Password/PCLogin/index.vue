<script lang="ts" setup>
import { ref, nextTick } from "vue"

const isHover = ref<boolean>(false)
const avatarBox = ref<HTMLDivElement>()
const avatarBoxOffsetHeight = ref<number>(92)

function onMouseEnterAvatar() {
  isHover.value = true
}

function onMouseLeaveAvatar() {
  isHover.value = false
}

nextTick(() => {
  avatarBoxOffsetHeight.value = avatarBox.value!.offsetHeight
  console.log("avatarBoxOffsetWidth.value", avatarBoxOffsetHeight.value)
})
</script>
<template>
  <div class="w-full h-full flex items-center">
    <div
      class="w-80% border-2px border-#44cef6 flex items-center rounded-1rem"
      :style="[
        isHover
          ? {
              height: `9.5rem`,
              width: `70%`,
              padding: `0`,
              boxShadow: `1px 1px 5px 1px #4b5cc4`,
            }
          : {
              height: `12rem `,
              width: `80%`,

              padding: `2%`,
              boxShadow: `0px 1px 8px 1px rgba(255,255,255,0.2)`,
            },
        { transition: `all 1s ` },
      ]"
    >
      <div
        ref="avatarBox"
        class="h-fit border-white border-0.2px rounded-1rem overflow-hidden"
        :style="[
          isHover
            ? { border: `1px solid black` }
            : {
                border: `0.5px solid white`,
                boxShadow: `1px 1px 10px 2px black`,
              },
          { transition: `all 1s` },
        ]"
        @mouseenter="onMouseEnterAvatar"
        @mouseleave="onMouseLeaveAvatar"
      >
        <img class="block h-9rem object-contain" src="@/assets/avatar.jpg" />
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
