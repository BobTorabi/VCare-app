<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <!--  removed class "flex" -->
  <div class="absolute inset-0  justify-center">
    <transition :name="name">
      <slot />
    </transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: 300ms;
}
.slide-enter-to {
  position: relative;
  right: 0;
}
.slide-leave-from {
  position: absolute;
}
.slide-enter-from {
  right: -100vw;
  position: absolute;
}
.slide-leave-to {
  left: 100vw;
}
.slidedown-enter-active,
.slidedown-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slidedown-enter-to,
.slidedown-leave-from {
  overflow: hidden;
  max-height: 1000px;
}

.slidedown-enter-from,
.slidedown-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
