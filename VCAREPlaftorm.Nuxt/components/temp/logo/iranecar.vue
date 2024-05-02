<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "desktop",
  },
});
</script>
<template>
  <div>
    <NuxtLink to="/">
      <img v-if="name == 'desktop'" src="@/assets/icons/desktop-logo.svg" alt="Iranecar-logo" />
      <img v-else-if="name == 'footer'" src="@/assets/icons/footer-logo.svg" alt="Iranecar-logo" />
      <img v-else-if="name == 'mobile'" src="@/assets/icons/mobile-logo.svg" alt="Iranecar-logo" />
      <img v-else-if="name == 'mobile-right'" src="@/assets/icons/mobile-right-logo.svg" alt="Iranecar-logo" />
    </NuxtLink>
  </div>
</template>

<style></style>
