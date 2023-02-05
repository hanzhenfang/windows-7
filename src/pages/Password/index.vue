<script lang="ts" setup>
import { ref, onMounted } from "vue"

import IconCombination from "@/components/IconCombination/index.vue"

// some options constants
const loadingDurationTime: number = 3000 // control IconCombination duration
//**************************************/

const isLoading = ref<boolean>(true)

function beforeHook() {
  const _startTime = Date.now()
  const _timeID = window.setInterval(() => {
    const _nowTime = Date.now()
    if (_nowTime - _startTime > loadingDurationTime) {
      clearInterval(_timeID)
      isLoading.value = false
    }
  })
}

onMounted(() => {
  beforeHook()
})
</script>
<template>
  <div
    class="w-full h-full bg-blue border-#0000C4 border-y-10vh overflow-hidden"
  >
    <div
      class="w-full h-full border-white border-y-0.2rem flex items-center justify-center pb-10%"
    >
      <div v-if="isLoading" class="w-full h-full flex flex-col items-center">
        <div class="icon w-full h-full flex justify-center items-center">
          <IconCombination :winSize="7" />
        </div>
        <div>
          <span class="text-1.5rem">Windows 正在启动. . .</span>
        </div>
      </div>

      <div v-else class="w-full h-full flex">
        <div
          class="flex-1 w-full flex flex-col items-center justify-center pr-1rem"
        >
          <div class="ml-auto">
            <IconCombination :companySize="1.5" :winSize="3" />
          </div>
          <div class="w-full text-right mt-1rem">
            <span class="text-1.3rem font-400">要开始，请单击您的用户名</span>
          </div>
        </div>
        <div class="w-0.1rem h-full bg-white"></div>
        <div class="flex-1 pl-1rem flex items-center justify-center">
          <div
            class="h-10rem border-blue border-0.2px rounded-0.5rem border-r-none overflow-hidden"
          >
            <div class="h-full bg-#2ec1cc">
              <div class="w-10rem h-full rounded-0.8rem overflow-hidden">
                <img
                  class="object-contain w-full h-full"
                  src="@/assets/avatar.jpg "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        v-show="true"
        class="w-full h-full flex items-center justify-center pl-20%"
      >
        <span
          class="font-600 text-4rem skew-x--25deg text-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]"
        >
          欢迎使用
        </span>
      </div> -->
    </div>

    <!-- footer content -->
    <div></div>
  </div>
</template>

<style scoped>
@keyframes iconin {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.icon {
  animation: iconin 3s linear;
}
</style>
