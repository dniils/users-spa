import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { User } from "../types";
import { fetchUsers } from "../api/fetchUsers";
import { getImageSrc } from "../api/getImageSource";
import { fetchUser } from "../api/fetchUser";

export const useUserData = createSharedComposable(() => {
  const users = ref<User[]>([]);
  const selectedUserInfo = ref<User | null>(null);
  const isLoading = ref(false);
  const imageIsLoading = ref(true);
  const isFetchingUser = ref(false);
  const popupIsActive = ref(false);

  async function getUsers(): Promise<void> {
    isLoading.value = true;

    try {
      const data = await fetchUsers();
      if (data) {
        users.value = data.map((user) => ({
          ...user,
          imageSource: getImageSrc(user.email),
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  async function getUser(id: number): Promise<User | undefined> {
    isFetchingUser.value = true;
    try {
      const userData = await fetchUser(id);

      if (userData) {
        const { email } = userData;
        return {
          ...userData,
          imageSource: getImageSrc(email),
        };
      }
    } catch (err) {
      console.error(err);
    } finally {
      isFetchingUser.value = false;
    }
  }

  async function showUserInfo(id: number) {
    if (selectedUserInfo.value) selectedUserInfo.value = null;
    popupIsActive.value = true;

    // if (isFetchingUser.value) return;

    const user = await getUser(id);
    if (user) selectedUserInfo.value = user;
  }

  function closePopup(): void {
    if (popupIsActive.value) {
      popupIsActive.value = false;
    }
    selectedUserInfo.value = null;
  }

  function handleImageLoad() {
    imageIsLoading.value = false;
  }

  return {
    users,
    selectedUserInfo,
    isLoading,
    isFetchingUser,
    imageIsLoading,
    popupIsActive,
    getUsers,
    showUserInfo,
    closePopup,
    handleImageLoad,
  };
});
