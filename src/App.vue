<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import UserCard from "./components/UserCard.vue";
import User from "./types";
import { fetchUsers } from "./api/fetchUsers";
import { getImageSrc } from "./api/getImageSource";

const users = ref<User[]>([]);
const inputValue = ref<string>("");

async function getUsers(): Promise<void> {
  const data = await fetchUsers();
  if (data) users.value = data;

  users.value.forEach(async (user) => {
    user.imageSource = getImageSrc(user.email);
  });
}

const usersToDisplay = computed(() => {
  if (!inputValue.value.trim()) {
    return users.value;
  }
  const searchTerm = inputValue.value.trim().toLowerCase();
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
});

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold text-center mb-6">Users</h1>

    <input
      type="text"
      class="flex mx-auto w-full sm:w-96 px-4 py-2 border border-slate-300 rounded-full mb-5"
      placeholder="Start typing name..."
      v-model.trim="inputValue"
    />

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <UserCard v-for="user in usersToDisplay" :key="user.id" :user="user" />
    </div>
  </div>
</template>
