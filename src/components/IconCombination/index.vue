<script lang="ts" setup>
import { ref, computed, nextTick, CSSProperties } from "vue"

import { useRootStore } from "@/store/rootStore"
import { storeToRefs } from "pinia"

const props = withDefaults(
  defineProps<{ companySize: number; winSize: number }>(),
  {
    companySize: 3,
    winSize: 7, //then main property of this component
  }
)

const rootStore = useRootStore()
const { isMobile } = storeToRefs(rootStore)
console.log("isMobile.value", isMobile.value)
const winSpan = ref<HTMLSpanElement>()
const companySpan = ref<HTMLSpanElement>()

const lineHight = ref<number>(8)

const iconBoxWidth = computed(() => {
  const winSpanWidth = winSpan.value?.offsetWidth!
  return winSpanWidth + 8
})

const winStyle = computed<CSSProperties>(() => {
  const _fontSize = isMobile.value ? props.winSize : 10
  console.log("_fontSize", _fontSize)
  return {
    fontSize: _fontSize + "rem",
    lineHeight: `${lineHight.value}rem`,
  }
})

const companyStyle = computed<CSSProperties>(() => {
  const _fontSize = isMobile.value ? props.companySize : 5
  return {
    fontSize: _fontSize + "rem",
  }
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
  lineHight.value = parseInt(_fontSize) + 1.5
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
        <span ref="companySpan" :style="companyStyle"> Microsoft </span>
      </div>

      <div class="self-end overflow-hidden">
        <img class="w-full object-contain" src="@/assets/WindowsXP.ico" />
      </div>
    </div>

    <div class="relative">
      <span ref="winSpan" class="text-white font-800" :style="winStyle">
        Windows
      </span>
      <span :style="xpStyle">XP</span>
    </div>
  </div>
</template>
