<script lang="ts" setup>
import { onMounted, shallowRef } from "vue"
import { useRootStore } from "@/store/rootStore"
import { storeToRefs } from "pinia"

import PCDeskTop from "@/pages/DeskTop/PCDeskTop/index.vue"
import MobileDeskTop from "@/pages/DeskTop/MobileDeskTop/index.vue"

import type { Component } from "vue"

const rootStore = useRootStore()
const { isMobile } = storeToRefs(rootStore)

const showComponent = shallowRef<Component>()

onMounted(() => {
  showComponent.value = isMobile.value ? MobileDeskTop : PCDeskTop
})
</script>
<template>
  <Component :is="showComponent" />
</template>
