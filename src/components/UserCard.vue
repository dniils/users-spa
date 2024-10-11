<script setup lang="ts">
import { User } from "../types";
import { useUserData } from "../composables/useUserData";

defineProps<{
  user: User;
}>();

const { imageIsLoading, handleImageLoad } = useUserData();

imageIsLoading.value = true;
</script>

<template>
  <div
    class="w-full shadow rounded-md overflow-hidden flex flex-col hover:shadow-md hover:cursor-pointer transition"
  >
    <div
      v-if="imageIsLoading"
      class="w-full h-64 sm:size-64 bg-slate-200 animate-pulse"
    ></div>
    <img
      v-show="!imageIsLoading"
      :src="user.imageSource"
      alt="image"
      class="w-full h-64 object-cover"
      @load="handleImageLoad"
    />

    <div class="p-2 flex-grow flex flex-col justify-between">
      <h2 class="font-bold text-center">{{ user.name }}</h2>
      <ul class="pt-2">
        <li class="border-b-2 last:border-0">
          <a :href="`mailto:${user.email}`" @click.stop="">{{ user.email }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
