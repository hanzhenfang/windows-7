<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { useRootStore } from "@/store/rootStore"
import { storeToRefs } from "pinia"

import { getNowDate } from "../../../utils/useNowTime"

import type { CSSProperties } from "vue"

const nowTime = ref<string>("11:13")
const rootStore = useRootStore()
const { isMobile } = storeToRefs(rootStore)

const fontSize = computed(() => {
  const size = isMobile.value ? 1 : 1.8
  return size
})

const style = computed<CSSProperties>(() => {
  return {}
})

onMounted(() => {
  setInterval(() => {
    nowTime.value = getNowDate()
  }, 1000)
})
</script>
<template>
  <div class="w-full h-3.5% bg-[rgba(27,69,209,1)] flex justify-between">
    <div
      class="w-10% h-full flex justify-between bg-[rgb(31,136,22,1)] px-1%"
      :class="isMobile ? 'w-18%' : 'w-8%'"
    >
      <img src="@/assets/WindowsXP.png" class="w-40% object-contain" />
      <div class="h-full flex items-center">
        <span
          class="font-300 skew-x--17deg"
          :style="{ fontSize: `${fontSize}rem` }"
        >
          开始
        </span>
      </div>
    </div>

    <!-- footer right -->
    <div
      class="h-full bg-[rgb(20,117,218)] flex items-center"
      :class="isMobile ? `w-50%` : `w-10%`"
    >
      <div class="w-50% h-full"></div>
      <div class="h-full w-50% flex items-center justify-between pr-1rem">
        <div class="h-full flex items-center">
          <img class="h-80%" src="@/assets/systemIcon/安全卫士.ico" />
          <img class="h-80%" src="@/assets/systemIcon/网络邻居.ico" />
        </div>

        <span class="font-500">{{ nowTime }}</span>
      </div>
    </div>
  </div>
</template>
