<script setup lang="ts">
defineProps(["user"]);
</script>

<template>
  <div class="w-full shadow rounded-md overflow-hidden flex flex-col">
    <img :src="user.imageSource" alt="image" class="w-full h-40 object-cover" />

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
