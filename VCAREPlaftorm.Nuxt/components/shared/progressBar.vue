<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  titles: {
    type: Array,
    required: true,
  }
});
</script>

<template>
  <div class="">
    <div class="flex items-center mb-11 mt-1 justify-center">
      <div v-for="(title, index) in titles" :key="index" class="flex items-center">
        <div class="relative w-20 flex flex-col gap-2 items-center text-xs text-center -mx-7 text-brand-purple z-30">
          <div v-if="index + 1 < step" class="flex rounded-full bg-color-aux p-1.5">
            <NuxtIcon class="w-3 text-white" name="check" />
          </div>
          <div v-if="index + 1 == step" class="flex rounded-full bg-color-aux">
            <NuxtIcon class="text-color-aux" name="circle-green" filled="" />
          </div>
          <NuxtIcon v-if="index + 1 > step" class="w-5 text-gray-200 " name="circle" />
          <p v-if="index + 1 == step" class="absolute top-[34px] w-14 font-bold">{{ title }}</p>
          <p v-else class="absolute top-8 w-14" :class="index + 1 <= step ? 'text-black top-[38px]' : 'text-black'">{{
            title }}</p>
        </div>
        <div v-if="index + 1 < titles.length" class="flex w-10 sm:w-24 h-[2px] z-0"
          :class="index + 1 < step ? 'bg-color-aux' : 'bg-[#B3BFCF]'">
        </div>
      </div>
    </div>
  </div>
</template>
