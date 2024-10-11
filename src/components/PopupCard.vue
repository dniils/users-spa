<script lang="ts" setup>
defineProps<{
  isActive: boolean;
}>();

const emit = defineEmits<{
  (e: "closePopup"): void;
}>();
</script>

<template>
  <div class="popup" :class="{ popup_active: isActive }">
    <div class="popup__overlay" @click="emit('closePopup')"></div>
    <div class="popup__box">
      <button class="popup__btn-close" @click="emit('closePopup')">X</button>
      <h3 class="text-xl font-bold text-center mb-2 md:mb-4">
        <slot name="header"></slot>
      </h3>
      <div class="text-sm">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.popup.popup_active {
  display: flex;
}

.popup .popup__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup .popup__box {
  position: relative;
  background: #ffffff;
  overflow: auto;
  overflow-wrap: break-word;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #00000033;
  width: 90%;
  max-width: 600px;
  max-height: 450px;
  height: 80vh;
}

.popup .popup__btn-close {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  background-color: #000;
  border-radius: 50%;
  line-height: 0;
  user-select: none;
}
</style>
