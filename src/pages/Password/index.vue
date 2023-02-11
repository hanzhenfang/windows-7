<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch, CSSProperties } from "vue"
import { useRouter } from "vue-router"

import IconCombination from "@/components/IconCombination/index.vue"
import MobileLogin from "@/pages/Password/MobileLogin/index.vue"
import PCLogin from "@/pages/Password/PCLogin/index.vue"

import { useRootStore } from "@/store/rootStore"
import { storeToRefs } from "pinia"

// some options constants
const loadingDurationTime: number = 1000 // control IconCombination duration
//**************************************/

const router = useRouter()
const rootStore = useRootStore()
const { isMobile } = storeToRefs(rootStore)

const iconWrapper = ref<HTMLDivElement>()
const iconWrapperOffsetWidth = ref()

const isLoading = ref<boolean>(true) // control before show avatar
const isChoice = ref<boolean>(false) // whether user has clicked one avatar
const isLoginSuccess = ref<boolean>(false) //

//tips: when user click one avatar
function hdlClickAvatar() {
  if (!isChoice.value) {
    isChoice.value = true
  } else {
    isLoginSuccess.value = true
    setTimeout(() => {
      if (isMobile) {
        router.push({ name: "desktop" })
      } else {
        window.open("https://juejin.cn/user/3065861918435437")
      }
    }, 2200)
  }
}

function hdlClickBackBtn() {
  isChoice.value = false
  isLoginSuccess.value = false
}

const moveLeftAnimation = computed<CSSProperties>(() => {
  return {
    transform: `translateX(-${iconWrapperOffsetWidth.value}px)`,
    opacity: `0`,
  }
})

const avatarScaleAnimation = computed<CSSProperties>(() => {
  return {
    transform: `translateX(-50%) scale(1.4)`,
  }
})

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

watch(isChoice, () => {
  nextTick(() => {
    iconWrapperOffsetWidth.value = iconWrapper.value?.offsetWidth
  })
})

onMounted(() => {
  beforeHook()
})
</script>
<template>
  <div
    id="root"
    class="w-full h-full relative bg-blue border-#0000C4 border-y-10vh"
  >
    <div
      class="w-full h-full border-white border-y-0.2rem flex items-center justify-center pb-10%"
    >
      <div v-if="isLoading" class="w-full h-full flex flex-col items-center">
        <div class="icon w-full h-full flex justify-center items-center">
          <IconCombination :winSize="7" />
        </div>
        <div>
          <span class="text-2rem font-600">Windows 正在启动. . .</span>
        </div>
      </div>

      <div v-else class="w-full h-full flex">
        <div
          @click="router.push({ name: 'desktop' })"
          ref="iconWrapper"
          class="w-50% flex flex-col items-center justify-center pr-1rem"
          :style="[
            isChoice ? moveLeftAnimation : {},
            { transition: `1.5s all` },
          ]"
        >
          <div class="ml-auto">
            <IconCombination :companySize="1.5" :winSize="3" />
          </div>
          <div class="w-full text-right mt-1rem">
            <span class="text-1.3rem font-600">要开始，请单击您的用户名</span>
          </div>
        </div>

        <div
          class="w-0.1rem h-full bg-white"
          :style="[
            isChoice ? moveLeftAnimation : {},
            { transition: `1.5s all` },
          ]"
        ></div>

        <!-- The avatar content, there should distinguish PC and Mobile -->
        <div
          class="w-50% h-full pl-1rem flex flex-col items-center justify-center"
          :style="[
            isChoice ? avatarScaleAnimation : { transform: `translateY(2rem)` },
            { transition: `all 1.6s` },
          ]"
        >
          <div
            v-if="isMobile"
            class="w-full flex flex-col items-center justify-center"
            @click="hdlClickAvatar"
          >
            <MobileLogin />
            <div class="mt-1rem">
              <span
                class="text-2rem font-400"
                :style="[
                  isChoice ? { opacity: 1 } : { opacity: 0 },
                  { transition: `all 1.5s` },
                ]"
                >韩振方😊</span
              >
            </div>
          </div>

          <div v-else class="w-full h-full flex items-center">
            <PCLogin />
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full absolute bottom-1rem flex justify-center px-10%"
      :style="[
        isLoginSuccess ? { opacity: 1 } : { opacity: 0 },
        { transition: 'all 1.5s' },
      ]"
    >
      <span
        class="font-600 text-2rem skew-x--25deg text-shadow-[1px_1px_3px_rgba(0,0,0,0.9)] flex-1 text-right"
      >
        欢迎使用
      </span>
    </div>

    <!-- footer content -->
    <div
      class="absolute z-99 w-full h-10vh px-5% flex justify-between"
      :style="[
        isChoice && !isLoginSuccess
          ? { transform: `translateY(0)` }
          : { transform: `translateY(100%)` },
        { transition: `all 1.5s` },
      ]"
    >
      <div class="flex items-center" @click="hdlClickBackBtn">
        <img src="@/assets/systemIcon/关机.ico" />
        <span class="text-2rem font-500 ml-1rem">返回</span>
      </div>

      <div class="max-w-14rem flex items-center">
        <span class=""
          >登录后, 你可以添加或更改账户，请转到“控制面板”,
          并单击“用户账户”。</span
        >
      </div>
    </div>
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
