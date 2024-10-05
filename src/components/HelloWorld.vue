<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <h1
    class="text-5xl font-bold text-teal-900 hover:text-teal-700 hover:translate-x-7 transition-all"
  >
    {{ msg }}
  </h1>
</template>

<style scoped></style>
