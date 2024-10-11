<script setup lang="ts">
import { ref, onMounted, computed, ComputedRef } from "vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import UserCard from "./components/UserCard.vue";
import UserPopup from "./components/UserPopup.vue";
import { User } from "./types";
import { useUserData } from "./composables/useUserData";

const inputValue = ref("");
const currentPage = ref(1);
const rowsPerPage = ref(10);

const {
  users,
  selectedUserInfo,
  isLoading,
  popupIsActive,
  getUsers,
  showUserInfo,
  closePopup,
} = useUserData();

const usersToDisplay: ComputedRef<User[]> = computed(() => {
  const searchTerm = inputValue.value.trim().toLowerCase();
  const filteredUsers = inputValue.value.trim()
    ? users.value.filter((user) => user.name.toLowerCase().includes(searchTerm))
    : users.value;

  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredUsers.slice(start, end);
});

const totalRecords: ComputedRef<number> = computed(() => {
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

const rowsPerPageOptions: ComputedRef<number[]> = computed(() => {
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

    <LoadingSpinner v-if="isLoading" />

    <ul
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li v-for="user in usersToDisplay" :key="user.id">
        <UserCard :user="user" @click="showUserInfo(user.id)" />
      </li>
    </ul>

    <UserPopup
      :isActive="popupIsActive"
      :selected-user-info="selectedUserInfo"
      @closePopup="closePopup"
    />

    <Paginator
      :rows="rowsPerPage"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="rowsPerPageOptions"
      class="mt-6"
      @page="pageChangeEventHandler"
    ></Paginator>
  </div>
</template>
