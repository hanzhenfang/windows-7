<script lang="ts" setup>
import { desktopIconGroup } from "./iconGroup"
import { openPersonalJueJin } from "@/utils/openJueJin"
</script>
<template>
  <div @click.stop="openPersonalJueJin" class="h-full pl-1% pt-1%">
    <div v-for="item in desktopIconGroup" class="w-full flex flex-col mb-1rem">
      <img class="w-5rem h-full object-contain mb-1rem" :src="item.icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
