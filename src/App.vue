<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from "vue";
import UserCard from "./components/UserCard.vue";
import User from "./types";
import { fetchUsers } from "./api/fetchUsers";
import { getImageSrc } from "./api/getImageSource";

const users = ref<User[]>([]);
const inputValue = ref<string>("");
const currentPage = ref<number>(1);
const rowsPerPage = ref<number>(10);

async function getUsers(): Promise<void> {
  const data = await fetchUsers();
  if (data) users.value = data;

  users.value.forEach(async (user) => {
    user.imageSource = getImageSrc(user.email);
  });
}

const usersToDisplay = computed(() => {
  const searchTerm = inputValue.value.trim().toLowerCase();
  const filteredUsers = inputValue.value.trim()
    ? users.value.filter((user) => user.name.toLowerCase().includes(searchTerm))
    : users.value;

  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredUsers.slice(start, end);
});

const totalRecords: ComputedRef<number> = computed((): number => {
  return inputValue.value.trim()
    ? users.value.filter((user) =>
        user.name.toLowerCase().includes(inputValue.value.trim().toLowerCase())
      ).length
    : users.value.length;
});

function pageChangeEventHandler(event: { first: number; rows: number }): void {
  currentPage.value = Math.floor(event.first / event.rows) + 1;
  rowsPerPage.value = event.rows;
  window.scrollTo({
    top: 0,
  });
}

const rowsPerPageOptions: ComputedRef<number[]> = computed((): number[] => {
  const options = [];
  const step = 5;
  const maxOptions = 100;

  for (let i = step; i <= Math.min(totalRecords.value, maxOptions); i += step) {
    options.push(i);
  }

  if (totalRecords.value > maxOptions) {
    options.push(totalRecords.value);
  }

  if (!options.includes(5)) {
    options.unshift(5);
  }

  return options;
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

    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li v-for="user in usersToDisplay" :key="user.id">
        <UserCard :user="user" />
      </li>
    </ul>
    <Paginator
      :rows="rowsPerPage"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="rowsPerPageOptions"
      class="mt-6"
      @page="pageChangeEventHandler"
    ></Paginator>
  </div>
</template>
