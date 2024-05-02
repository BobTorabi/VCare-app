<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="flex flex-col space-y-3 w-full bg-white">
    <div class="flex flex-col space-y-4">
      <div
        class="flex flex-col border border-blue-500 rounded-md overflow-x-auto"
      >
        <div
          class="flex items-center justify-between w-full bg-blue-200 p-3 font-semibold"
        >
          <p>پلاک خودرو :</p>
          <p>
            {{ data.plateWord }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">وضعیت کارت</p>
            <p class="text-xs md:text-md">
              {{ data.documentStatusTitle }} 
            </p>
          </div>
          <div class="flex justify-between py-2 px-3">
            <p class="text-xs md:text-md font-bold">تاریخ چاپ کارت</p>
            <p class="text-xs md:text-md">
              {{ data.cardPrintDate }}
            </p>
          </div>
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">بارکد پستی کارت</p>
            <p class="text-xs md:text-md">
              {{ data.cardPostalBarcode }}
            </p>
          </div>
          <div class="flex justify-between py-2 px-3">
            <p class="text-xs md:text-md font-bold">وضعیت سند</p>
            <p class="text-xs md:text-md">
              {{ data.cardStatusTitle }}
            </p>
          </div>
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">تاریخ چاپ سند</p>
            <p class="text-xs md:text-md">
              {{ data.documentPrintDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
