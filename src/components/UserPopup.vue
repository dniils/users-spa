<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { User, UserInfoEntry } from "../types";
import PopupCard from "./PopupCard.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps<{
  isActive: boolean;
  selectedUserInfo: User | null;
}>();

const userInfoEntries: ComputedRef<UserInfoEntry[]> = computed(
  () => Object.entries(props.selectedUserInfo ?? []) as UserInfoEntry[]
);

function emitClosePopup() {
  emit("closePopup");
}

const emit = defineEmits<{
  (e: "closePopup"): void;
}>();
</script>

<template>
  <PopupCard :isActive="props.isActive" @closePopup="emitClosePopup">
    <template #header> User Info </template>

    <template #content>
      <LoadingSpinner v-if="!selectedUserInfo" />
      <ul v-else>
        <li v-for="[key, value] in userInfoEntries" :key="key">
          <p>
            <b>{{ key }}</b
            >: {{ value }}
          </p>
        </li>
      </ul>
    </template>
  </PopupCard>
</template>
