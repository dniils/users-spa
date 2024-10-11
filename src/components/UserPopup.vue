<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { User, UserInfoEntry } from "../types";
import PopupCard from "./PopupCard.vue";

const props = defineProps<{
  isActive: boolean;
  selectedUserInfo: User | null;
}>();

const userInfo: ComputedRef<UserInfoEntry[]> = computed(
  () => Object.entries(props.selectedUserInfo ?? []) as UserInfoEntry[]
);

function closePopup() {
  emit("closePopup");
}

const emit = defineEmits<{
  (e: "closePopup"): void;
}>();
</script>

<template>
  <PopupCard :isActive="props.isActive" @closePopup="closePopup">
    <template #header> User Info </template>
    <template #content v-if="selectedUserInfo">
      <ul>
        <li v-for="[key, value] in userInfo" :key="key">
          <p>
            <b>{{ key }}</b
            >: {{ value }}
          </p>
        </li>
      </ul>
    </template>
  </PopupCard>
</template>
