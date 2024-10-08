<script setup lang="ts">
import { ref } from "vue";

defineProps(["user"]);
const isLoading = ref(true);

function handleImageLoad() {
  isLoading.value = false;
}
</script>

<template>
  <div class="w-full shadow rounded-md overflow-hidden flex flex-col">
    <div
      v-if="isLoading"
      class="w-full h-64 sm:size-64 bg-slate-200 animate-pulse"
    ></div>
    <img
      v-show="!isLoading"
      :src="user.imageSource"
      alt="image"
      class="w-full h-64 object-cover"
      @load="handleImageLoad"
    />

    <div class="p-2 flex-grow flex flex-col justify-between">
      <h2 class="font-bold text-center">{{ user.name }}</h2>
      <ul class="pt-2">
        <li class="border-b-2 last:border-0">
          <a :href="`mailto:${user.email}`">{{ user.email }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
