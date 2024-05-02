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
          <p>شماره گواهینامه:</p>
          <p>
            {{ data[0].printNum }}
          </p>
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">صاحب گواهینامه</p>
            <p class="text-xs md:text-md">
              {{ data[0].firstName }} {{ data[0].lastName }}
            </p>
          </div>
          <div class="flex justify-between py-2 px-3">
            <p class="text-xs md:text-md font-bold">نوع گواهینامه</p>
            <p class="text-xs md:text-md">{{ data[0].title }}</p>
          </div>
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">شماره ملی</p>
            <p class="text-xs md:text-md">{{ data[0].nationalNo }}</p>
          </div>
          <div class="flex justify-between py-2 px-3">
            <p class="text-xs md:text-md font-bold">تاریخ صدور</p>
            <p class="text-xs md:text-md">{{ data[0].printDate }}</p>
          </div>
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">مدت اعتبار</p>
            <p class="text-xs md:text-md">{{ data[0].validYears }} سال</p>
          </div>
          <div class="flex justify-between py-2 px-3">
            <p class="text-xs md:text-md font-bold">آخرین وضعیت گواهینامه</p>
            <p class="text-xs md:text-md">{{ data[0].rahvarStatus }}</p>
          </div>
          <div class="flex justify-between bg-blue-100 py-2 px-3">
            <p class="text-xs md:text-md font-bold">بارکد پستی</p>
            <p class="text-xs md:text-md">{{ data[0].barcode }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
