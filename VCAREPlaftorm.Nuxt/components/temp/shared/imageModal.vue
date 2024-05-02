<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <div
    @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50"
  >
    <div
      class="relative flex flex-col w-[300px] md:w-[450px] h-96 bg-slate-50 px-8 pt-8 pb-5 items-center justify-evenly farsi-num"
    >
      <button
        class="absolute top-0 left-0 p-3 hover:bg-slate-200"
        @click="$emit('close')"
      >
        <nuxt-icon class="w-6" name="cross" />
      </button>
      <img :src="'data:image/png;base64,' + image" alt="">
    </div>
  </div>
</template>
