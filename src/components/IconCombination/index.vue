<script lang="ts" setup>
import { ref, computed, nextTick, CSSProperties } from "vue"

const props = withDefaults(
  defineProps<{ companySize: number; winSize: number; xpSize: number }>(),
  {
    companySize: 3,
    winSize: 7.5,
    xpSize: 2,
  }
)

const winSpan = ref<HTMLSpanElement>()
const companySpan = ref<HTMLSpanElement>()
const lineHight = ref<number>(7)

const iconBoxWidth = computed(() => {
  const winSpanWidth = winSpan.value?.offsetWidth!
  return winSpanWidth + 8
})

const xpStyle = computed<CSSProperties>(() => {
  return {
    position: "absolute",
    fontSize: props.winSize / 2 + "rem",
    right: -props.winSize * 0.625 + "rem",
    bottom: props.winSize / 4 + "rem",
    color: "red",
    fontWeight: 800,
  }
})

nextTick(() => {
  const _fontSize = companySpan.value?.style.fontSize!
  lineHight.value = parseInt(_fontSize) + 1
})
</script>
<template>
  <div
    class="w-full basis-45% flex flex-col items-center"
    :style="{ paddingRight: `${winSize / 2}rem` }"
  >
    <div
      class="flex h-full justify-center"
      :style="{ width: `${iconBoxWidth}px` }"
    >
      <div class="self-end basis-40%">
        <span ref="companySpan" :style="{ fontSize: `${companySize}rem` }">
          Microsoft
        </span>
      </div>

      <div class="self-end overflow-hidden">
        <img class="max-w-80% object-contain" src="@/assets/WindowsXP.ico" />
      </div>
    </div>

    <div class="relative">
      <span
        ref="winSpan"
        class="text-white font-800"
        :style="{ fontSize: `${winSize}rem`, lineHeight: `${lineHight}rem` }"
      >
        Windows
      </span>
      <span :style="xpStyle">XP</span>
    </div>
  </div>
</template>
