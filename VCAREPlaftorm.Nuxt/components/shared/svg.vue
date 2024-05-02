<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <img :src="src" alt="" />
</template>
