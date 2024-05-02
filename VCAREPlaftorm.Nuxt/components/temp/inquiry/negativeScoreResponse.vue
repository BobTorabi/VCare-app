<script setup>

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
   <div class="flex flex-col gap-4">
    <div
      class="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between farsi-num border py-3 border-blue-500 rounded-md px-4"
    >
      <div class="flex justify-between gap-2 md:gap-10 items-center">
        <p class="flex flex-col md:flex-row items-center gap-1">
          <span class="font-semibold text-brand-blue"> پاسخ استعلام نمره منفی : </span>
          <span class="font-semibold  text-sm md:text-md">
            شما 
            <!-- <span class="text-lg text-brand-red" v-if="data.negPoint > 0">
                   {{ data.negPoint }}
            </span> -->
            <span class="text-lg text-brand-red" v-if="data.negPoint">
              {{ data.negPoint }}
            </span>
            نمره منفی گواهینامه دارید
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
