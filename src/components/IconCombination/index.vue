<script lang="ts" setup>
import { ref, computed, CSSProperties } from "vue"

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

const winSpan = ref<HTMLSpanElement>()
const companySpan = ref<HTMLSpanElement>()

const iconBoxWidth = computed(() => {
  const winSpanWidth = winSpan.value?.offsetWidth!
  return winSpanWidth + 8
})

const winStyle = computed<CSSProperties>(() => {
  const _fontSize = isMobile.value ? props.winSize : 10
  return {
    fontSize: _fontSize + "rem",
    lineHeight: `${_fontSize * 0.7}rem`,
  }
})

const companyStyle = computed<CSSProperties>(() => {
  const _fontSize = isMobile.value ? props.companySize : 5
  return {
    fontSize: _fontSize + "rem",
  }
})

const xpStyle = computed<CSSProperties>(() => {
  const _fontSize = isMobile.value ? props.winSize : 10
  return {
    position: "absolute",
    fontSize: _fontSize / 2 + "rem",
    bottom: _fontSize / 4 + "rem",
    color: "red",
    fontWeight: 800,
  }
})
</script>
<template>
  <div
    class="w-full basis-45% flex flex-col items-center"
    :style="{ paddingRight: `${parseInt(xpStyle.fontSize as string) + 1}rem` }"
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
