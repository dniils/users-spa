<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserCard from "./components/UserCard.vue";
import User from "./types";
import { fetchUsers } from "./api/fetchUsers";
import { getImageSrc } from "./api/getImageSource";

const users = ref<User[]>([]);

async function getUsers(): Promise<void> {
  const data = await fetchUsers();
  if (data) users.value = data;

  users.value.map(async (user) => {
    user.imageSource = getImageSrc(user.email);
  });
}

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold text-center mb-6">User Cards</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>
