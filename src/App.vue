<script lang="ts" setup>
import { RouterView } from "vue-router"

import { isMobile } from "./utils/isMobile"
</script>
<template>
  <div class="w-screen h-screen overflow-hidden">
    <RouterView />
  </div>
</template>
