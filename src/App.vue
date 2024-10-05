<script setup lang="ts">
import { ref } from "vue";
import UserCard from "./components/UserCard.vue";

const users = ref([
  { id: 0, name: "Tamadur Demian", email: "email@mail.com" },
  {
    id: 1,
    name: "Namrata Chakrabarti",
    email: "email@mail.com",
  },
  {
    id: 2,
    name: "Borislav Gusev",
    email: "email@mail.com",
  },
  { id: 3, name: "Zuhayr Hamdan", email: "email@mail.com" },
  { id: 4, name: "Riche Gosse", email: "email@mail.com" },
]);
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
