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
      class="flex flex-row gap-4 md:gap-0 md:flex-row md:justify-between farsi-num border py-3 border-blue-500 rounded-md px-4"
    >
      <div class="flex flex-col sm:flex-row justify-between mx-auto gap-2 md:gap-10 items-center">
        <p class="flex flex-col md:flex-row items-center gap-1" v-if="data.plaques[0].secInSerial">
          <span class="font-semibold text-brand-blue float-right"> شماره پلاک : </span>
          <span class="font-semibold text-brand-red md:text-md text-sm">
            {{ data.plaques[0].plaque }}
          </span>
        </p>
        <p class="flex flex-col md:flex-row xs:w-full md:w-auto items-center gap-1" v-if="data.plaques[0].secInSerial">
          <span class="font-semibold text-brand-blue"> شماره سریال پلاک : </span>
          <span class="font-semibold text-brand-red md:text-md text-sm">
            {{ data.plaques[0].secInSerial }}
          </span>
        </p>
        <p class="flex flex-col md:flex-row items-center gap-1" v-if="data.plaques[0].mnfk_SHDN_DATE">
          <span class="font-semibold text-brand-blue"> تاریخ فک پلاک : </span>
          <span class="font-semibold text-brand-red md:text-md text-sm">
            {{ data.plaques[0].mnfk_SHDN_DATE }}
          </span>
        </p>
        <p class="flex flex-col md:flex-row items-center gap-1" v-if="data.plaques[0].description">
          <span class="font-semibold text-brand-blue"> محل فک پلاک : </span>
          <span class="font-semibold text-brand-red md:text-md text-sm">
            {{ data.plaques[0].description }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
