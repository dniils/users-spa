<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserCard from "./components/UserCard.vue";
import User from "./types";

const users = ref<User[]>([]);

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  fetchUsers();
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
