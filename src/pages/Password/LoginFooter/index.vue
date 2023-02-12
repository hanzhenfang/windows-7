<script lang="ts" setup>
const props = defineProps<{
  isShow: boolean
  isLoginSuccess: boolean
  closeBtnText: string
}>()

const emit = defineEmits<{
  (event: "clickCloseBtn")
}>()
</script>

<template>
  <div
    class="absolute z-99 w-full h-10vh px-5% flex justify-between"
    :style="[
      isShow && !isLoginSuccess
        ? { transform: `translateY(0)` }
        : { transform: `translateY(100%)` },
      { transition: `all 1.5s` },
    ]"
  >
    <div class="flex items-center" @click.stop="emit('clickCloseBtn')">
      <img src="@/assets/systemIcon/关机.ico" />
      <span class="text-2rem font-500 ml-1rem">{{ closeBtnText }}</span>
    </div>

    <div class="max-w-14rem flex items-center">
      <span class=""
        >登录后, 你可以添加或更改账户，请转到“控制面板”,
        并单击“用户账户”。</span
      >
    </div>
  </div>
</template>
